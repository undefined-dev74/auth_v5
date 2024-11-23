"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { setRedirectAfterLogin } from "@/utils/authRedirect";
import { useUser } from "@/hooks/store";
import { EmptySpace, EmptySpaceItem } from "@/components/empty-state";
import { Boxes, Check, Share2, Star, User2, X } from "lucide-react";
import { Spinner } from "@/components/ui/circular-spinner";
import useSWR from "swr";
import { WORKSPACE_INVITATION } from "@/constants/fetch-keys";
import { WorkspaceService } from "@/services/workspace.service";
import DefaultLayout from "@/layouts/default-layout";
import { observer } from "mobx-react-lite";

const workspaceService = new WorkspaceService();

const AcceptInvitation = observer(() => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const invitation_id = searchParams.get("invitationId");
  const workspaceSlug = searchParams.get("workspaceSlug");
  const invitationToken = searchParams.get("token");

  const { currentUser, currentUserLoader } = useUser();
  const [token, setToken] = useState<string | null>(null);
  const [isAccepting, setIsAccepting] = useState(false);

  const { data: invitationDetail, error } = useSWR(
    invitation_id && workspaceSlug && WORKSPACE_INVITATION(invitation_id.toString()),
    invitation_id && workspaceSlug
      ? () => workspaceService.getWorkspaceInvitation(workspaceSlug.toString(), invitation_id.toString())
      : null
  );

  useEffect(() => {
    setToken(invitationToken);

    if (!currentUser && !currentUserLoader && workspaceSlug && invitation_id) {
      // User is not logged in, set redirect and navigate to login
      const currentUrl = `/accept-invitation?invitationId=${invitation_id}&workspaceSlug=${workspaceSlug}&token=${invitationToken}`;
      setRedirectAfterLogin(currentUrl);
      router.push(`/auth/login?next_path=${encodeURIComponent(currentUrl)}`);
    } else if (currentUser && workspaceSlug && invitation_id && !isAccepting) {
      handleAccept();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, currentUserLoader, workspaceSlug, invitation_id, invitationToken]);

  const handleAccept = () => {
    if (!invitationDetail) return;
    setIsAccepting(true);
    workspaceService
      .joinWorkspace(invitationDetail.workspace.slug, invitationDetail.id, {
        accepted: true,
        email: invitationDetail.email,
        token: token,
      })
      .then(() => {
        router.push(`/workspace/${invitationDetail.workspace.id}`);
      })
      .catch((err) => {
        console.error(err);
        setIsAccepting(false);
      });
  };

  const handleReject = () => {
    if (!invitationDetail) return;
    workspaceService
      .joinWorkspace(invitationDetail.workspace.slug, invitationDetail.id, {
        accepted: false,
        email: invitationDetail.email,
        token,
      })
      .then(() => {
        router.push("/");
      })
      .catch((err) => console.error(err));
  };

  if (currentUserLoader || isAccepting) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }
  // if (!currentUser) {
  //   return null; // This will briefly show before redirecting to login
  // }
  console.log(invitationDetail);
  return (
    <DefaultLayout>
      <div className="flex h-full w-full flex-col items-center justify-center px-3">
        {invitationDetail ? (
          <>
            {error ? (
              <div className="flex w-full flex-col space-y-4 rounded border border-custom-border-200 bg-custom-background-100 px-4 py-8 text-center shadow-2xl md:w-1/3">
                <h2 className="text-xl uppercase">INVITATION NOT FOUND</h2>
              </div>
            ) : (
              <>
                {invitationDetail.accepted ? (
                  <>
                    <EmptySpace
                      title={`You are already a member of ${invitationDetail.workspace?.name}`}
                      description="Your workspace is where you'll create projects, collaborate on your issues, and organize different streams of work in your Plane account."
                    >
                      <EmptySpaceItem Icon={Boxes} title="Continue to Dashboard" href="/" />
                    </EmptySpace>
                  </>
                ) : (
                  <EmptySpace
                    title={`You have been invited to ${invitationDetail.workspace?.name}`}
                    description="Your workspace is where you'll create projects, collaborate on your issues, and organize different streams of work in your Plane account."
                  >
                    <EmptySpaceItem Icon={Check} title="Accept" action={handleAccept} />
                    <EmptySpaceItem Icon={X} title="Ignore" action={handleReject} />
                  </EmptySpace>
                )}
              </>
            )}
          </>
        ) : error ? (
          <EmptySpace
            title="This invitation link is not active anymore."
            description="Your workspace is where you'll create projects, collaborate on your issues, and organize different streams of work in your Plane account."
            link={{ text: "Or start from an empty project", href: "/" }}
          >
            {!currentUser ? (
              <EmptySpaceItem Icon={User2} title="Sign in to continue" href="/" />
            ) : (
              <EmptySpaceItem Icon={Boxes} title="Continue to Dashboard" href="/home" />
            )}
            <EmptySpaceItem Icon={Star} title="Star us on GitHub" href="https://github.com/makeplane" />
            <EmptySpaceItem
              Icon={Share2}
              title="Join our community of active creators"
              href="https://discord.com/invite/8SR2N9PAcJ"
            />
          </EmptySpace>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Spinner />
          </div>
        )}
      </div>
    </DefaultLayout>
  );
});

export default AcceptInvitation;
