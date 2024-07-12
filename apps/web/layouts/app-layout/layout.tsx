"use client"
import { FC, ReactNode } from "react";
// layouts
import { UserAuthWrapper } from "@/layouts/auth-layout";
// components

import { Sidebar } from "./sidebar";
import { observer } from "mobx-react-lite";


// import { EIssuesStoreType } from "constants/issue";
import useSWR from "swr";
import { Header } from "./header";
import { BellIcon, HomeIcon } from "lucide-react";

export interface IAppLayout {
  children: React.ReactNode;
  withProjectWrapper?: boolean;
}

export const AppLayout: FC<IAppLayout> = observer(({children} :IAppLayout) => {
 

  const workspaceSlug = "plane-demo";
  const projectId = "b16907a9-a55f-4f5b-b05e-7065a0869ba6";

  // const { issues, issuesFilter } = useIssues(EIssuesStoreType.ARCHIVED);

  useSWR(
    workspaceSlug && projectId
      ? `PROJECT_ARCHIVED_ISSUES_V3_${workspaceSlug}_${projectId}`
      : null,
    async () => {
      if (workspaceSlug && projectId) {
        await issuesFilter?.fetchFilters(workspaceSlug, projectId);
        // await issues?.fetchIssues(workspaceSlug, projectId, issues?.groupedIssueIds ? "mutation" : "init-loader");
      }
    },
    {
      revalidateOnFocus: false,
      refreshInterval: 600000,
      revalidateOnMount: true,
    }
  );

  return (
    <>
      <UserAuthWrapper>
      <div className="h-full w-full overflow-hidden">
        <div className="flex h-full w-full overflow-hidden">
          <Sidebar />
          <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#191919]">
            <div className="z-[15]">
              <div className="z-10 flex w-full items-center border-b border-custom-border-200">
                <div className="w-full">
                  <Header />
                </div>
              </div>
            </div>
            <main className="h-full w-full overflow-hidden bg-[#202020]">
              <div className="relative h-full w-full overflow-x-hidden overflow-y-scroll">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
      </UserAuthWrapper>
    </>
  );
});
