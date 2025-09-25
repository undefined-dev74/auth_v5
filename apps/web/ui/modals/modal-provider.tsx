"use client";

import useWorkspace from "@/lib/swr/use-workspace";
import useWorkspaces from "@/lib/swr/use-workspaces";

import { useAcceptInviteModal } from "@/ui/modals/accept-invite-modal";
import { useAddWorkspaceModal } from "@/ui/modals/add-workspace-modal";
import { useImportCsvModal } from "@/ui/modals/import-csv-modal";
import { useProgramWelcomeModal } from "./program-welcome-modal";

import type { SimpleLinkProps } from "@/lib/types";
import { useCookies } from "@app/ui";
import { getUrlFromString } from "@app/utils";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  Suspense,
  createContext,
  useEffect,
  useMemo,
} from "react";

export const ModalContext = createContext<{
  setShowAddWorkspaceModal: Dispatch<SetStateAction<boolean>>;
  setShowImportCsvModal: Dispatch<SetStateAction<boolean>>;
}>({
  setShowAddWorkspaceModal: () => {},
  setShowImportCsvModal: () => {},
});

export function ModalProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense>
      <ModalProviderClient>{children}</ModalProviderClient>
    </Suspense>
  );
}

function ModalProviderClient({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const newLinkValues = useMemo(() => {
    const newLink = searchParams.get("newLink");
    if (newLink && getUrlFromString(newLink)) {
      return {
        url: getUrlFromString(newLink),
        domain: searchParams.get("newLinkDomain"),
      };
    } else {
      return null;
    }
  }, [searchParams]);

  const { AddWorkspaceModal, setShowAddWorkspaceModal } =
    useAddWorkspaceModal();
  const { AcceptInviteModal, setShowAcceptInviteModal } =
    useAcceptInviteModal();

  const { setShowImportCsvModal, ImportCsvModal } = useImportCsvModal();

  const { setShowProgramWelcomeModal, ProgramWelcomeModal } =
    useProgramWelcomeModal();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setShowProgramWelcomeModal(searchParams.has("onboarded-program"));
  }, [searchParams]);

  const [hashes, setHashes] = useCookies<SimpleLinkProps[]>("hashes__dub", [], {
    domain: process.env.NEXT_PUBLIC_VERCEL_URL ? ".dub.co" : undefined,
  });

  const { id: workspaceId, error } = useWorkspace();

  // handle invite and oauth modals
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (error && (error.status === 409 || error.status === 410)) {
      setShowAcceptInviteModal(true);
    }
  }, [error]);

  const { data: session, update } = useSession();
  const { workspaces } = useWorkspaces();

  // if user has workspaces but no defaultWorkspace, refresh to get defaultWorkspace
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (
      workspaces &&
      workspaces.length > 0 &&
      session?.user &&
      !session.user.defaultWorkspace
    ) {
      fetch("/api/user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          defaultWorkspace: workspaces[0].slug,
        }),
      }).then(() => update());
    }
  }, [session]);

  return (
    <ModalContext.Provider
      value={{
        setShowAddWorkspaceModal,
        setShowImportCsvModal,
      }}
    >
      <AddWorkspaceModal />
      <AcceptInviteModal />
      <ImportCsvModal />
      <ProgramWelcomeModal />
      {children}
    </ModalContext.Provider>
  );
}
