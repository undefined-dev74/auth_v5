import { useApplication } from "@/hooks/store";
import { observer } from "mobx-react-lite";
import React from "react";
import { Tooltip, TooltipTrigger } from "../ui/tooltip";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { BellIcon, HomeIcon, LucideIcon } from "lucide-react";

interface DashboardMenuItem {
  title: string;
  label?: string;
  icon: LucideIcon;
  variant: "default" | "ghost";
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
    },
    {
      title: "Notifications",
      label: "0",
      icon: BellIcon,
      variant: "ghost",
    },
  ],
};

export const DashboardSidebarMenu = observer(() => {
  // store hooks
  const {
    theme: { sidebarCollapsed, toggleSidebar, toggleMobileSidebar },
  } = useApplication();

  const isCollapsed = sidebarCollapsed || false;

  return (
    <nav className="grid gap-1 px-2 sm:py-2 group-[[data-collapsed=true]]:justify-center  group-[[data-collapsed=true]]:px-2 ">
      {DASHBOARD_MENU_ITEMS.links.map((link, index) =>
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
  );
});
