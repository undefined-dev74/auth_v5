import type { WorkspaceProps } from "@/lib/types";
import { prisma } from "@app/prisma";
import { APP_DOMAIN_WITH_NGROK } from "@app/utils";
import { waitUntil } from "@vercel/functions";
import { qstash } from "../cron";

export async function deleteWorkspace(
  workspace: Pick<WorkspaceProps, "id" | "slug" | "logo" | "stripeId">
) {
  await Promise.all([
    // Remove the users
    prisma.projectUsers.deleteMany({
      where: {
        projectId: workspace.id,
      },
    }),

    // Remove the default workspace
    prisma.user.updateMany({
      where: {
        defaultWorkspace: workspace.slug,
      },
      data: {
        defaultWorkspace: null,
      },
    }),
  ]);

  waitUntil(
    Promise.all([
      // Remove the API keys
      prisma.restrictedToken.deleteMany({
        where: {
          projectId: workspace.id,
        },
      }),
      // queue the workspace for deletion
      queueWorkspaceDeletion({
        workspaceId: workspace.id,
      }),
    ])
  );
}

export async function deleteWorkspaceAdmin(
  workspace: Pick<WorkspaceProps, "id" | "slug" | "logo" | "stripeId">
) {
  console.log(`Deleted workspace ${workspace.slug}`);

  return {};
}

export async function queueWorkspaceDeletion({
  workspaceId,
  delay,
}: {
  workspaceId: string;
  delay?: number;
}) {
  return await qstash.publishJSON({
    url: `${APP_DOMAIN_WITH_NGROK}/api/cron/workspaces/delete`,
    ...(delay && { delay }),
    body: {
      workspaceId,
    },
  });
}
