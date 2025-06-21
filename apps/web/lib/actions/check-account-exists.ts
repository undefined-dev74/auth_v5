"use server";

import { ratelimit } from "@/lib/upstash";
import { emailSchema } from "@/lib/zod/schemas/auth";
import { prisma } from "@app/prisma";
import { getIP } from "../api/utils";
import z from "../zod";
import { throwIfAuthenticated } from "./auth/throw-if-authenticated";
import { actionClient } from "./safe-action";

const schema = z.object({
  email: emailSchema,
});

// Check if account exists
export const checkAccountExistsAction = actionClient
  .schema(schema)
  .use(throwIfAuthenticated)
  .action(async ({ parsedInput }) => {
    const { email } = parsedInput;

    const { success } = await ratelimit(8, "1 m").limit(
      `account-exists:${getIP()}`
    );

    if (!success) {
      throw new Error("Too many requests. Please try again later.");
    }

    console.log("success", success);

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        passwordHash: true,
      },
    });

    console.log("first user", user);
    return {
      accountExists: !!user,
      hasPassword: !!user?.passwordHash,
    };
  });
