import { prisma } from "@app/prisma";
import { DUB_WORKSPACE_ID, getSearchParams } from "@app/utils";
import { getSession } from "./utils";

// Internal use only (for admin portal)
type WithAdminHandler = ({
  req,
  params,
  searchParams,
}: {
  req: Request;
  params: Record<string, string>;
  searchParams: Record<string, string>;
}) => Promise<Response>;

export const isDubAdmin = async (userId: string) => {
  const response = await prisma.projectUsers.findUnique({
    where: {
      userId_projectId: {
        userId,
        projectId: DUB_WORKSPACE_ID,
      },
    },
  });
  if (!response) {
    return false;
  }
  return true;
};

export const withAdmin =
  (handler: WithAdminHandler) =>
  async (
    req: Request,
    { params = {} }: { params: Record<string, string> | undefined }
  ) => {
    const session = await getSession();
    if (!session?.user) {
      return new Response("Unauthorized: Login required.", { status: 401 });
    }

    const isAdminUser = await isDubAdmin(session.user.id);
    if (!isAdminUser) {
      return new Response("Unauthorized: Not an admin.", { status: 401 });
    }

    const searchParams = getSearchParams(req.url);
    return handler({ req, params, searchParams });
  };
