"use client";

import { LucideIcon } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSession } from "next-auth/react";

import {
  WorkspaceHelpSection,
  WorkspaceSidebarDropdown,
  WorkspaceSidebarQuickAction,
  WorkspaceSidebarMenu,
} from "@/components/workspace";
import { useApplication } from "@/hooks/store";
import { observer } from "mobx-react-lite";

interface SidebarProps {
 
  links?: {
    title: string;
    label?: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
  }[];
}

export const Sidebar = observer( ({ links }: SidebarProps) => {
  const {
    theme: { sidebarCollapsed, toggleSidebar, toggleMobileSidebar },
  } = useApplication();


  const { data: session, status } = useSession();

  return (
    <aside
      data-collapsed={sidebarCollapsed}
      className={`fixed inset-y-0 z-20 flex h-full flex-shrink-0 flex-grow-0 flex-col border-r border-custom-sidebar-border-200 bg-[#191919]
        duration-300 md:relative
        ${sidebarCollapsed ? "-ml-[280px]" : ""}
        sm:${sidebarCollapsed ? "-ml-[280px]" : ""}
        md:ml-0 ${sidebarCollapsed ? "w-[80px]" : "w-[280px]"}
        lg:ml-0 ${sidebarCollapsed ? "w-[80px]" : "w-[280px]"}
        ${sidebarCollapsed ? "items-center" : ""}
      `}
    >
      <div className="grid h-[3.7rem] justify-center items-end pb-2">
        <WorkspaceSidebarDropdown />
      </div>
      <div className="flex h-full w-full flex-1 flex-col">
        <WorkspaceSidebarQuickAction />
      </div>
      <nav className="grid gap-1 px-2 sm:py-2 group-[[data-collapsed=true]]:justify-center  group-[[data-collapsed=true]]:px-2 ">
        {links.map((link, index) =>
          sidebarCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className={cn(
                    buttonVariants({ variant: link.variant, size: "icon" }),
                    "h-9 w-9",
                    link.variant === "default" &&
                      "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {link.label && (
                  <span className="ml-auto text-muted-foreground">
                    {link.label}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={index}
              href="#"
              className={cn(
                buttonVariants({ variant: link.variant, size: "sm" }),
                link.variant === "default" &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                "justify-start"
              )}
            >
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
              {link.label && (
                <span
                  className={cn(
                    "ml-auto",
                    link.variant === "default" &&
                      "text-background dark:text-white"
                  )}
                >
                  {link.label}
                </span>
              )}
            </Link>
          )
        )}
      </nav>
      <div className="flex h-full w-full flex-1 flex-col">
        <WorkspaceSidebarMenu />
      </div>
      <div className="flex h-full w-full flex-1 flex-col justify-end">
        <WorkspaceHelpSection />
      </div>
    </aside>
  );
})
