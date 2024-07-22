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

import {
  WorkspaceHelpSection,
  WorkspaceSidebarDropdown,
  WorkspaceSidebarQuickAction,
  WorkspaceSidebarMenu,
} from "@/components/workspace";
import { useApplication } from "@/hooks/store";
import { observer } from "mobx-react-lite";
import { DashboardSidebarMenu } from "@/components/dashboard";
import { ProjectSidebarList } from "@/components/project/sidebar-list";

interface SidebarProps {
  links?: {
    title: string;
    label?: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
  }[];
}

export const Sidebar = observer(({ links }: SidebarProps) => {
  const {
    theme: { sidebarCollapsed, toggleSidebar, toggleMobileSidebar },
  } = useApplication();

  return (
    <div
      data-collapsed={sidebarCollapsed}
      className={cn(
        "inset-y-0 z-20 flex h-full flex-shrink-0 flex-grow-0 flex-col border-r border-border bg-background duration-300 fixed md:relative",
        sidebarCollapsed ? "-ml-[280px] sm:-ml-[280px] md:ml-0 w-[80px] lg:w-[80px] items-center" : "w-[280px] lg:w-[280px]"
      )}
    >
      <div className="flex h-full w-full flex-1 flex-col">
        <WorkspaceSidebarDropdown />
        <WorkspaceSidebarQuickAction />
        <DashboardSidebarMenu />
        <WorkspaceSidebarMenu />
        <ProjectSidebarList />
        <WorkspaceHelpSection />
      </div>
    </div>
  );
});
