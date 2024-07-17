import { useApplication } from "@/hooks/store";
import { observer } from "mobx-react-lite";
import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

import { BellIcon, HomeIcon, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";

interface DashboardMenuItem {
  title: string;
  label?: string;
  icon: LucideIcon;
  href?: string
  variant: "default" | "ghost";
  highlight: (pathname: string, baseUrl: string) => boolean;
}

interface DashboardMenu {
  links: DashboardMenuItem[];
}

const DASHBOARD_MENU_ITEMS: DashboardMenu = {
  links: [
    {
      title: "Home",
      label: "",
      icon: HomeIcon,
      variant: "default",
      highlight: (pathname: string, baseUrl: string) =>
        pathname.startsWith(baseUrl),
    },
    {
      title: "Notifications",
      label: "0",
      icon: BellIcon,
      variant: "ghost",
      highlight: (pathname: string, baseUrl: string) =>
        pathname.startsWith(baseUrl),
    },
  ],
};

export const DashboardSidebarMenu = observer(() => {
  // store hooks
  const {
    theme: { sidebarCollapsed, toggleSidebar, toggleMobileSidebar },
  } = useApplication();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const workspaceSlug = searchParams.get("workspaceSlug") || "";

  const isCollapsed = sidebarCollapsed || false;

  return (
    <nav
      className={`grid gap-1 px-2 sm:py-2 group-[[data-collapsed=true]]:justify-center ${
        sidebarCollapsed ? "justify-center" : ""
      } group-[[data-collapsed=true]]:px-2`}
    >
      {DASHBOARD_MENU_ITEMS.links.map((link, index) =>
        sidebarCollapsed ? (
          <Tooltip key={index} delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                href={`/${workspaceSlug}${link.href}`}
                className={cn(
                  buttonVariants({ variant: link.variant, size: "icon" }),
                  "flex h-9 w-9 items-center justify-center rounded-md",
                  link.highlight(pathname, `/${workspaceSlug}`)
                    ? "bg-custom-primary-100/10 text-custom-primary-100"
                    : "text-custom-sidebar-text-200 hover:bg-custom-sidebar-background-80 focus:bg-custom-sidebar-background-80"
                )}
              >
                <link.icon className="h-4 w-4" />
                <span className="sr-only">{link.title}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-4">
              {link.title}
              {link.label && (
                <span className="ml-auto text-muted-foreground font-normal">
                  {link.label}
                </span>
              )}
            </TooltipContent>
          </Tooltip>
        ) : (
          <Link
            key={index}
            href={`/${workspaceSlug}${link.href}`}
            className={cn(
              buttonVariants({ variant: link.variant, size: "sm" }),
              "flex gap-2.5 rounded-md px-3 py-2 text-sm justify-start",
              link.highlight(pathname, `/${workspaceSlug}`)
                ? "bg-custom-primary-100/10 text-custom-primary-100"
                : "text-custom-sidebar-text-200 hover:bg-custom-sidebar-background-80 focus:bg-custom-sidebar-background-80 ju"
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
  );
});
