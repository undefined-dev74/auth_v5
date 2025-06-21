import { PrismaClient } from "@prisma/client";

export const prisma =
  global.prisma ||
  new PrismaClient({
    omit: {
      user: { passwordHash: true },
    },
  });

declare global {
  // biome-ignore lint/suspicious/noRedeclare: <explanation>
  var prisma:
    | PrismaClient<{ omit: { user: { passwordHash: true } } }>
    | undefined;
}

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export { PrismaClient };

export * from "@prisma/client";
