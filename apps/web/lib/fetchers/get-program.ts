import { prisma } from "@app/prisma";
import { cache } from "react";

export const getProgram = cache(
  async ({
    slug,
    include,
  }: {
    slug: string;
    include?: ("defaultRewards" | "defaultDiscount")[];
  }) => {
    const program = await prisma.program.findUnique({
      where: {
        slug,
      },
      include: {
        ...(include?.includes("defaultRewards") && {
          rewards: {
            where: {
              default: true, // program-wide rewards only
            },
          },
        }),
        ...(include?.includes("defaultDiscount") && {
          defaultDiscount: true,
        }),
      },
    });

    if (!program) {
      return null;
    }

    return program;
  }
);
