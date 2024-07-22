import React, { useRef, useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePlatformOS } from "@/hooks/use-plateform-os";
import { cn } from "@/lib/utils";
import { Transition } from "@headlessui/react";
import { FileText, GithubIcon, MoveLeft, Settings } from "lucide-react";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa";
import { useApplication } from "@/hooks/store";

const HELP_OPTIONS = [
  {
    name: "Documentation",
    href: "https://docs.plane.so/",
    Icon: FileText,
  },
  {
    name: "Join our Discord",
    href: "https://discord.com/invite/A92xrEGCge",
    Icon: FaDiscord,
  },
  {
    name: "Report a bug",
    href: "https://github.com/makeplane/plane/issues/new/choose",
    Icon: GithubIcon,
  },
];

export interface WorkspaceHelpSectionProps {
  setSidebarActive?: React.Dispatch<React.SetStateAction<any>>;
  isCollapsed?: boolean;
}

export const WorkspaceHelpSection: React.FC<WorkspaceHelpSectionProps> = () => {
  const {
    theme: { sidebarCollapsed, toggleSidebar, toggleMobileSidebar },
  } = useApplication();
  const { isMobile } = usePlatformOS();
  const [isNeedHelpOpen, setIsNeedHelpOpen] = useState(false);
  const helpOptionsRef = useRef<HTMLDivElement | null>(null);
  const isCollapsed = sidebarCollapsed || false;

  return (
    <>
      <div
        className={cn(
          "flex w-full items-center justify-between gap-1 self-baseline border-t border-border bg-background px-4 h-14 flex-shrink-0",
          {
            "flex-col h-auto py-1.5": isCollapsed,
          }
        )}
      >
        {!isCollapsed && (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <div className="w-1/2 cursor-default rounded-md bg-green-500/10 px-2 py-1 text-center text-xs font-medium text-green-500 outline-none leading-6">
                Community
              </div>
            </TooltipTrigger>
          </Tooltip>
        )}
        <div
          className={cn(
            "flex items-center gap-1",
            isCollapsed ? "flex-col justify-center" : "w-1/2 justify-evenly"
          )}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <ModeToggle />
            </TooltipTrigger>
            <TooltipContent>Toggle Theme</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className={cn(
                  "grid place-items-center rounded-md p-1.5 text-muted-foreground outline-none hover:bg-secondary hover:text-foreground",
                  isCollapsed ? "w-full" : ""
                )}
                onClick={() => setIsNeedHelpOpen((prev) => !prev)}
              >
                <Settings className="h-3.5 w-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Settings</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="grid place-items-center rounded-md p-1.5 text-muted-foreground outline-none hover:bg-secondary hover:text-foreground md:hidden"
                onClick={() => toggleSidebar()}
              >
                <MoveLeft className="h-3.5 w-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Expand</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className={cn(
                  "hidden place-items-center rounded-md p-1.5 text-muted-foreground outline-none hover:bg-secondary hover:text-foreground md:grid",
                  isCollapsed ? "w-full" : ""
                )}
                onClick={() => toggleSidebar()}
              >
                <MoveLeft
                  className={cn(
                    "h-3.5 w-3.5 duration-300",
                    isCollapsed ? "rotate-180" : ""
                  )}
                />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              {`${isCollapsed ? "Expand" : "Hide"}`}
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="relative">
          <Transition
            show={isNeedHelpOpen}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <div
              className={cn(
                "absolute bottom-2 min-w-[10rem] divide-y divide-border whitespace-nowrap rounded bg-background p-1 shadow-md",
                isCollapsed ? "left-full" : "-left-[75px]"
              )}
              ref={helpOptionsRef}
            >
              <div className="space-y-1 pb-2">
                {HELP_OPTIONS.map(({ name, Icon, href }) => (
                  <Link href={href} key={name} target="_blank">
                    <span className="flex items-center gap-x-2 rounded px-2 py-1 text-xs hover:bg-secondary">
                      <div className="grid flex-shrink-0 place-items-center">
                        <Icon
                          className="h-3.5 w-3.5 text-muted-foreground"
                          size={14}
                        />
                      </div>
                      <span className="text-xs">{name}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
};
