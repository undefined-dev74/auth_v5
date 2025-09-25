import type { UserProps } from "@/lib/types";
import { ratelimit } from "@/lib/upstash";
import { sendEmail } from "@app/email";
import { LoginLink } from "@app/email/templates/login-link";
import type { PrismaClient } from "@app/prisma";

import prisma from "@/lib/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions, User } from "next-auth";
import type { AdapterUser } from "next-auth/adapters";
import type { JWT } from "next-auth/jwt";
import AzureADProvider from "next-auth/providers/azure-ad";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { APP_DOMAIN_WITH_NGROK, DUB_WORKSPACE_ID } from "@app/utils";
import { waitUntil } from "@vercel/functions";
import { createId } from "../api/create-id";
import { qstash } from "../cron";
import {
  exceededLoginAttemptsThreshold,
  incrementLoginAttempts,
} from "./lock-account";
import { validatePassword } from "./password";

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;

const CustomPrismaAdapter = (p: PrismaClient) => {
  return {
    ...PrismaAdapter(p),
    createUser: async (data: Omit<UserProps, "id">) => {
      console.log("create user", data);
      return p.user.create({
        data: {
          ...data,
          id: createId({ prefix: "user_" }),
        },
      });
    },
  };
};

export const authOptions: NextAuthOptions = {
  providers: [
    EmailProvider({
      sendVerificationRequest({ identifier, url }) {
        if (process.env.NODE_ENV === "development") {
          console.log(`Login link: ${url}`);
          return;
        } else {
          sendEmail({
            email: identifier,
            subject: `Your ${process.env.NEXT_PUBLIC_APP_NAME} Login Link`,
            react: LoginLink({ url, email: identifier }),
          });
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),

    // Microsoft Azure AD Provider
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID as string,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
      tenantId: process.env.AZURE_AD_TENANT_ID as string,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          scope: "openid profile email User.Read",
        },
      },
      profile(profile) {
        console.log("profile", profile);
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email || profile.preferred_username,
          image: null, // Azure AD doesn't provide avatar URLs by default
        };
      },
    }),
    // Sign in with email and password
    CredentialsProvider({
      id: "credentials",
      name: "app.design",
      type: "credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          throw new Error("no-credentials");
        }

        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error("no-credentials");
        }

        const { success } = await ratelimit(5, "1 m").limit(
          `login-attempts:${email}`
        );

        if (!success) {
          throw new Error("too-many-login-attempts");
        }

        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            passwordHash: true,
            name: true,
            email: true,
            image: true,
            invalidLoginAttempts: true,
            emailVerified: true,
          },
        });

        if (!user || !user.passwordHash) {
          throw new Error("invalid-credentials");
        }

        if (exceededLoginAttemptsThreshold(user)) {
          throw new Error("exceeded-login-attempts");
        }

        const passwordMatch = await validatePassword({
          password,
          passwordHash: user.passwordHash,
        });

        if (!passwordMatch) {
          const exceededLoginAttempts = exceededLoginAttemptsThreshold(
            await incrementLoginAttempts(user)
          );

          if (exceededLoginAttempts) {
            throw new Error("exceeded-login-attempts");
          } else {
            throw new Error("invalid-credentials");
          }
        }

        if (!user.emailVerified) {
          throw new Error("email-not-verified");
        }

        // Reset invalid login attempts
        await prisma.user.update({
          where: { id: user.id },
          data: {
            invalidLoginAttempts: 0,
          },
        });

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
  // @ts-ignore
  adapter: CustomPrismaAdapter(prisma),
  session: { strategy: "jwt" },
  cookies: {
    sessionToken: {
      name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
        domain: VERCEL_DEPLOYMENT
          ? `.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
          : undefined,
        secure: VERCEL_DEPLOYMENT,
      },
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      console.log({ user, account, profile });

      if (user?.lockedAt) {
        return false;
      }

      if (
        account?.provider === "google" ||
        account?.provider === "github" ||
        account?.provider === "azure-ad"
      ) {
        const userExists = await prisma.user.findUnique({
          where: { email: user.email as string },
          select: { id: true, name: true, image: true },
        });
        if (!userExists || !profile) {
          return true;
        }
      }
      return true;
    },
    jwt: async ({
      token,
      user,
      trigger,
    }: {
      token: JWT;
      user: User | AdapterUser | UserProps;
      trigger?: "signIn" | "update" | "signUp";
    }) => {
      if (user) {
        token.user = user;
      }

      // refresh the user's data if they update their name / email
      if (trigger === "update") {
        const refreshedUser = await prisma.user.findUnique({
          where: {
            id: token.sub,
          },
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            defaultPartnerId: true,
            defaultWorkspace: true,
          },
        });
        const isAdminUser = await prisma.projectUsers.findUnique({
          where: {
            userId_projectId: {
              userId: user.id,
              projectId: DUB_WORKSPACE_ID,
            },
          },
        });

        if (refreshedUser) {
          token.user = refreshedUser;
          token.isAdmin = !!isAdminUser;
        } else {
          return {};
        }
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        id: token.sub,
        isAdmin: token.isAdmin,
        // @ts-ignore
        ...(token || session).user,
      };
      return session;
    },
  },
  events: {
    async signIn(message) {
      const email = message.user.email as string;
      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          createdAt: true,
        },
      });
      if (!user) {
        console.log(
          `User ${message.user.email} not found, skipping welcome workflow...`
        );
        return;
      }
      // only process new user workflow if the user was created in the last 15s (newly created user)
      if (
        user.createdAt &&
        new Date(user.createdAt).getTime() > Date.now() - 15000
      ) {
        console.log(
          `New user ${user.email} created,  triggering welcome workflow...`
        );
        waitUntil(
          Promise.allSettled([
            // trigger welcome workflow 15 minutes after the user signed up
            qstash.publishJSON({
              url: `${APP_DOMAIN_WITH_NGROK}/api/cron/welcome-user`,
              delay: 15 * 60,
              body: { userId: user.id },
            }),
          ])
        );
      }
    },
  },
};
