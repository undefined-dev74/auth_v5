import type { UserProps } from "@/lib/types";
import { prisma } from "@app/prisma";

export async function getDefaultWorkspace(user: UserProps) {
  let defaultWorkspace = user?.defaultWorkspace;

  if (!defaultWorkspace) {
    const refreshedUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        defaultWorkspace: true,
        projects: {
          select: {
            project: {
              select: {
                slug: true,
              },
            },
          },
          take: 1,
        },
      },
    });

    defaultWorkspace =
      refreshedUser?.defaultWorkspace ||
      refreshedUser?.projects[0]?.project?.slug ||
      undefined;
  }

  return defaultWorkspace;
}
