import bcrypt from "bcryptjs";

import { getUserByEmail } from "@/data/user";
import { LoginSchema } from "@/schema";
import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";

export default {
  providers: [
    credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          console.log("dsds", user);
          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
