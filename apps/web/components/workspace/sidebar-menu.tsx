"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { observer } from "mobx-react-lite";
import { FC } from "react";

// hooks
import { useApplication, useEventTracker } from "@/hooks/store";

// ui
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// constants
import { SIDEBAR_MENU_ITEMS } from "@/constants/dashboard";
import { SIDEBAR_CLICKED } from "@/constants/event-tracker";
import { EUserWorkspaceRoles } from "@/constants/workspace";

// helper
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { LucideIcon } from "lucide-react";

interface Props {
  // Add any props that your Icon component expects
}

interface SidebarMenuItem {
  key: string;
  label: string;
  href: string;
  access: EUserWorkspaceRoles;
  highlight: (pathname: string, baseUrl: string) => boolean;
  Icon: LucideIcon;
  variant?: string
}

export const WorkspaceSidebarMenu = observer(() => {
  const { theme: themeStore } = useApplication();
  const { captureEvent } = useEventTracker();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const workspaceSlug = searchParams.get("workspaceSlug") || "";

  const handleLinkClick = (itemKey: string) => {
    if (window.innerWidth < 768) {
      themeStore.toggleMobileSidebar();
    }
    captureEvent(SIDEBAR_CLICKED, {
      destination: itemKey,
    });
  };

  return (
    <nav
      className={`grid gap-1 px-2 sm:py-2 group-[[data-collapsed=true]]:justify-center ${
        themeStore.sidebarCollapsed ? "justify-center" : ""
      } group-[[data-collapsed=true]]:px-2`}
    >
      {SIDEBAR_MENU_ITEMS.map((link: SidebarMenuItem, index) => (
        <React.Fragment key={index}>
          {themeStore.sidebarCollapsed ? (
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={`/${workspaceSlug}${link.href}`}
                  onClick={() => handleLinkClick(link.key)}
                  className={cn(
                    // buttonVariants({ variant: link.variant, size: "icon" }),
                    "flex h-9 w-9 items-center justify-center rounded-md",
                    link.highlight(pathname, `/${workspaceSlug}`)
                      ? "bg-custom-primary-100/10 text-custom-primary-100"
                      : "text-custom-sidebar-text-200 hover:bg-custom-sidebar-background-80 focus:bg-custom-sidebar-background-80"
                  )}
                >
                  <link.Icon className="h-4 w-4" />
                  <span className="sr-only">{link.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.label}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              href={`/${workspaceSlug}${link.href}`}
              onClick={() => handleLinkClick(link.key)}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm",
                link.highlight(pathname, `/${workspaceSlug}`)
                  ? "bg-custom-primary-100/10 text-custom-primary-100"
                  : "text-custom-sidebar-text-200 hover:bg-custom-sidebar-background-80 focus:bg-custom-sidebar-background-80"
              )}
            >
              <link.Icon className="mr-2 h-4 w-4" />
              {link.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
});
