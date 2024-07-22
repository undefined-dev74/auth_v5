import { useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { ChevronUp, PenSquare, Search } from "lucide-react";
// hooks
import { useApplication, useUser } from "@/hooks/store";
import useLocalStorage from "@/hooks/use-local-storage";
// components
// import { CreateUpdateDraftIssueModal } from "components/issues";
// constants
import { EUserWorkspaceRoles } from "@/constants/workspace";
import { cn } from "@/lib/utils";
// import { EIssuesStoreType } from "constants/issue";

export const WorkspaceSidebarQuickAction = observer(() => {
  // states
  const [isDraftIssueModalOpen, setIsDraftIssueModalOpen] = useState(false);

  const { theme: themeStore } = useApplication();
  //   const { setTrackElement } = useEventTracker();
  //   const { joinedProjectIds } = useProject();
  //   const {
  //     membership: { currentWorkspaceRole },
  //   } = useUser();

  const { storedValue, clearValue } = useLocalStorage<any>(
    "draftedIssue",
    JSON.stringify({})
  );

  //useState control for displaying draft issue button instead of group hover
  const [isDraftButtonOpen, setIsDraftButtonOpen] = useState(false);

  const timeoutRef = useRef<any>();

  const isSidebarCollapsed = themeStore.sidebarCollapsed;

  const isAuthorizedUser = true;
  // currentWorkspaceRole >= EUserWorkspaceRoles.MEMBER;

  //   const disabled = joinedProjectIds.length === 0;
  const disabled = false;

  const onMouseEnter = () => {
    //if renet before timout clear the timeout
    timeoutRef?.current && clearTimeout(timeoutRef.current);
    setIsDraftButtonOpen(true);
  };

  const onMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDraftButtonOpen(false);
    }, 300);
  };
  return (
    <>
      <div
        className={cn(
          "mt-4 flex w-full cursor-pointer items-center justify-between px-4",
          isSidebarCollapsed ? "flex-col gap-1" : "gap-2"
        )}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {isAuthorizedUser && (
          <div
            className={cn(
              "relative flex w-full cursor-pointer items-center justify-between gap-1 rounded px-2",
              isSidebarCollapsed
                ? "px-2 hover:bg-secondary"
                : "border border-border px-3 shadow-md"
            )}
          >
            <button
              type="button"
              className={cn(
                "relative flex flex-shrink-0 flex-grow items-center gap-2 rounded py-1.5 outline-none",
                isSidebarCollapsed ? "justify-center" : "",
                disabled ? "cursor-not-allowed opacity-50" : ""
              )}
              onClick={() => {
                // ... (keep existing onClick logic)
              }}
              disabled={disabled}
            >
              <PenSquare className="h-4 w-4 text-muted-foreground" />
              {!isSidebarCollapsed && (
                <span className="text-sm font-medium">New Issue</span>
              )}
            </button>

            {!disabled &&
              storedValue &&
              Object.keys(JSON.parse(storedValue)).length > 0 && (
                <>
                  <div
                    className={cn(
                      "h-8 w-0.5 bg-secondary",
                      isSidebarCollapsed ? "hidden" : "block"
                    )}
                  />

                  <button
                    type="button"
                    className={cn(
                      "ml-1.5 flex flex-shrink-0 items-center justify-center rounded py-1.5",
                      isSidebarCollapsed ? "hidden" : "block"
                    )}
                  >
                    <ChevronUp
                      className={cn(
                        "h-4 w-4 rotate-180 transform text-muted-foreground transition-transform duration-300",
                        isDraftButtonOpen ? "rotate-0" : ""
                      )}
                    />
                  </button>

                  <div
                    className={cn(
                      "fixed left-4 mt-0 h-10 w-[203px] pt-2",
                      isSidebarCollapsed ? "top-[5.5rem]" : "top-24",
                      isDraftButtonOpen ? "block" : "hidden"
                    )}
                  >
                    <div className="h-full w-full">
                      <button
                        onClick={() => setIsDraftIssueModalOpen(true)}
                        className="flex w-full flex-shrink-0 items-center rounded border border-border bg-background px-3 py-[10px] text-sm text-muted-foreground shadow"
                      >
                        <PenSquare
                          size={16}
                          className="mr-2 !text-lg !leading-4 text-muted-foreground"
                        />
                        Last Drafted Issue
                      </button>
                    </div>
                  </div>
                </>
              )}
          </div>
        )}

        <button
          className={cn(
            "flex flex-shrink-0 items-center rounded p-2 gap-2 outline-none",
            isAuthorizedUser ? "justify-center" : "w-full",
            isSidebarCollapsed
              ? "hover:bg-secondary"
              : "border border-border shadow-md"
          )}
        >
          <Search className="h-4 w-4 text-muted-foreground" />
          {!isAuthorizedUser && !isSidebarCollapsed && (
            <span className="text-xs font-medium">Open command menu</span>
          )}
        </button>
      </div>
    </>
  );
});
