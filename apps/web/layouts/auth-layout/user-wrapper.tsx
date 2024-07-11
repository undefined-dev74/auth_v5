import { FC, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { observer } from "mobx-react-lite";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

// hooks
import { useUser, useWorkspace } from "@/hooks/store";

// ui
import { Spinner } from "@/components/ui/circular-spinner";

export interface IUserAuthWrapper {
  children: ReactNode;
}

export const UserAuthWrapper: FC<IUserAuthWrapper> = observer((props) => {
  const { children } = props;

  // store hooks
  const {
    currentUser,
    currentUserError,
    fetchCurrentUser,
    fetchCurrentUserInstanceAdminStatus,
  } = useUser();
  const { fetchWorkspaces } = useWorkspace();

  // router
  const router = useRouter();
  const pathname = usePathname();

  // fetching user information
  useSWR("CURRENT_USER_DETAILS", () => fetchCurrentUser(), {
    shouldRetryOnError: false,
  });

  // fetching current user instance admin status
  useSWRImmutable(
    "CURRENT_USER_INSTANCE_ADMIN_STATUS",
    () => fetchCurrentUserInstanceAdminStatus(),
    {
      shouldRetryOnError: false,
    }
  );

  // fetching all workspaces
  useSWR("USER_WORKSPACES_LIST", () => fetchWorkspaces(), {
    shouldRetryOnError: false,
  });

  if (!currentUser && !currentUserError) {
    return (
      <div className="grid h-screen place-items-center bg-custom-background-100 p-4">
        <div className="flex flex-col items-center gap-3 text-center">
          <Spinner />
        </div>
      </div>
    );
  }

  if (currentUserError) {
    const redirectTo = pathname;
    router.push(`/?next_path=${redirectTo}`);
    return null;
  }

  return <>{children}</>;
});
