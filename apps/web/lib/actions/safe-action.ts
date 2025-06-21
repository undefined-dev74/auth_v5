import { normalizeWorkspaceId } from "@/lib/api/workspace-id";
import { prisma } from "@app/prisma";
import { createSafeActionClient } from "next-safe-action";
import { getSession } from "../auth";

export const actionClient = createSafeActionClient({
  handleServerError: (e) => {
    console.error("Server action error:", e);

    if (e instanceof Error) {
      return e.message;
    }

    return "An unknown error occurred.";
  },
});

export const authUserActionClient = actionClient.use(async ({ next }) => {
  const session = await getSession();

  if (!session?.user.id) {
    throw new Error("Unauthorized: Login required.");
  }

  return next({
    ctx: {
      user: session.user,
    },
  });
});

export const authActionClient = actionClient.use(
  async ({ next, clientInput }) => {
    const session = await getSession();

    if (!session?.user.id) {
      throw new Error("Unauthorized: Login required.");
    }

    // @ts-ignore
    let workspaceId = clientInput?.workspaceId;

    if (!workspaceId) {
      throw new Error("WorkspaceId is required.");
    }

    workspaceId = normalizeWorkspaceId(workspaceId);

    const workspace = await prisma.project.findUnique({
      where: {
        id: workspaceId,
      },
      include: {
        users: {
          where: {
            userId: session.user.id,
          },
          select: {
            role: true,
            workspacePreferences: true,
          },
        },
      },
    });

    if (!workspace || !workspace.users || workspace.users.length === 0) {
      throw new Error("Workspace not found.");
    }

    return next({
      ctx: {
        user: session.user,
        workspace: {
          ...workspace,
          plan: workspace.plan,
        },
      },
    });
  }
);
