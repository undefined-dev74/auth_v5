import { randomBytes } from "node:crypto";
import { ApiError } from "@/lib/api/errors";
import { hashToken, withSession } from "@/lib/auth";
import { ratelimit, redis } from "@/lib/upstash";
import { uploadedImageSchema } from "@/lib/zod/schemas/misc";
import { sendEmail } from "@app/email";
import { unsubscribe } from "@app/email/resend/unsubscribe";
import ConfirmEmailChange from "@app/email/templates/confirm-email-change";
import { prisma } from "@app/prisma";
import { APP_DOMAIN, R2_URL, trim } from "@app/utils";
import { waitUntil } from "@vercel/functions";
import { NextResponse } from "next/server";
import { z } from "zod";

const updateUserSchema = z.object({
  name: z.preprocess(trim, z.string().min(1).max(64)).optional(),
  email: z.preprocess(trim, z.string().email()).optional(),
  image: uploadedImageSchema.nullish(),
  source: z.preprocess(trim, z.string().min(1).max(32)).optional(),
  defaultWorkspace: z.preprocess(trim, z.string().min(1)).optional(),
});

// GET /api/user – get a specific user
export const GET = withSession(async ({ session }) => {
  const [user, account] = await Promise.all([
    prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        subscribed: true,
        source: true,
        defaultWorkspace: true,
        defaultPartnerId: true,
        passwordHash: true,
        createdAt: true,
      },
    }),

    prisma.account.findFirst({
      where: {
        userId: session.user.id,
      },
      select: {
        provider: true,
      },
    }),
  ]);

  return NextResponse.json({
    ...user,
    provider: account?.provider,
    hasPassword: user?.passwordHash !== null,
    passwordHash: undefined,
  });
});

// PATCH /api/user – edit a specific user
export const PATCH = withSession(async ({ req, session }) => {
  const { name, email, image, source, defaultWorkspace } =
    await updateUserSchema.parseAsync(await req.json());

  // if (image) {
  //   const { url } = await storage.upload(
  //     `avatars/${session.user.id}_${nanoid(7)}`,
  //     image
  //   );
  //   image = url;
  // }

  if (defaultWorkspace) {
    const workspaceUser = await prisma.projectUsers.findFirst({
      where: {
        userId: session.user.id,
        project: {
          slug: defaultWorkspace,
        },
      },
    });

    if (!workspaceUser) {
      throw new ApiError({
        code: "forbidden",
        message: `You don't have access to the workspace ${defaultWorkspace}.`,
      });
    }
  }

  // Verify email ownership if the email is being changed
  if (email && email !== session.user.email) {
    const userWithEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithEmail) {
      throw new ApiError({
        code: "conflict",
        message: "Email is already in use.",
      });
    }

    const { success } = await ratelimit(10, "1 d").limit(
      `email-change-request:${session.user.id}`
    );

    if (!success) {
      throw new ApiError({
        code: "rate_limit_exceeded",
        message:
          "You've requested too many email change requests. Please try again later.",
      });
    }

    const token = randomBytes(32).toString("hex");
    const expiresIn = 15 * 60 * 1000;

    await prisma.verificationToken.create({
      data: {
        identifier: session.user.id,
        token: await hashToken(token, { secret: true }),
        expires: new Date(Date.now() + expiresIn),
      },
    });

    await redis.set(
      `email-change-request:user:${session.user.id}`,
      {
        email: session.user.email,
        newEmail: email,
      },
      {
        px: expiresIn,
      }
    );

    waitUntil(
      sendEmail({
        subject: "Confirm your email address change",
        email,
        react: ConfirmEmailChange({
          email: session.user.email,
          newEmail: email,
          confirmUrl: `${APP_DOMAIN}/auth/confirm-email-change/${token}`,
        }),
      })
    );
  }

  const response = await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      ...(name && { name }),
      ...(image && { image }),
      ...(source && { source }),
      ...(defaultWorkspace && { defaultWorkspace }),
    },
  });

  waitUntil(
    (async () => {
      // Delete only if a new image is uploaded and the old image exists
      if (
        image &&
        session.user.image &&
        session.user.image.startsWith(`${R2_URL}/avatars/${session.user.id}`)
      ) {
        // await storage.delete(session.user.image.replace(`${R2_URL}/`, ""));
      }
    })()
  );

  return NextResponse.json(response);
});

export const PUT = PATCH;

// DELETE /api/user – delete a specific user
export const DELETE = withSession(async ({ session }) => {
  const userIsOwnerOfWorkspaces = await prisma.projectUsers.findMany({
    where: {
      userId: session.user.id,
      role: "owner",
    },
  });
  if (userIsOwnerOfWorkspaces.length > 0) {
    return new Response(
      "You must transfer ownership of your workspaces or delete them before you can delete your account.",
      { status: 422 }
    );
  } else {
    const user = await prisma.user.delete({
      where: {
        id: session.user.id,
      },
    });
    const response = await Promise.allSettled([
      // if the user has a custom avatar and it is stored by their userId, delete it
      user.image?.startsWith(`${R2_URL}/avatars/${session.user.id}`) &&
        // storage.delete(user.image.replace(`${R2_URL}/`, "")),
        unsubscribe({ email: session.user.email }),
    ]);
    return NextResponse.json(response);
  }
});
