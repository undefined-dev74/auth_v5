import { withWorkspace } from "@/lib/auth";
import type { WorkspaceProps } from "@/lib/types";
import { prisma } from "@app/prisma";
import { NextResponse } from "next/server";

// GET /api/workspaces/[idOrSlug]/notification-preferences – get notification preferences for a workspace for the current user
export const GET = withWorkspace(
  async ({
    workspace,
    session,
  }: {
    workspace: WorkspaceProps;
    session: any;
  }) => {
    const response = await prisma.notificationPreference.findFirstOrThrow({
      select: {
        domainConfigurationUpdates: true,
        linkUsageSummary: true,
        newPartnerSale: true,
        newPartnerApplication: true,
      },
      where: {
        projectUser: {
          userId: session.user.id,
          projectId: workspace.id,
        },
      },
    });

    return NextResponse.json(response);
  }
);
