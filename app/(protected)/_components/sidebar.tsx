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
import { AccountSwitcher } from "./account-switcher";
import { SidebarQuickAction } from "./sidebar-quick-action";

interface SidebarProps {
  isCollapsed: boolean;
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
  }[];
  setIsCollapsed: React.Dispatch<any>;
}

export function Sidebar({ links, isCollapsed, setIsCollapsed }: SidebarProps) {
  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const { data: session, status } = useSession();
  return (
    <aside
      data-collapsed={isCollapsed}
      className={`fixed inset-y-0 z-20 flex h-full flex-shrink-0 flex-grow-0 flex-col border-r border-custom-sidebar-border-200 bg-custom-sidebar-background-100
        duration-300 md:relative
        ${isCollapsed ? "-ml-[280px]" : ""}
        sm:${isCollapsed ? "-ml-[280px]" : ""}
        md:ml-0 ${isCollapsed ? "w-[80px]" : "w-[280px]"}
        lg:ml-0 ${isCollapsed ? "w-[80px]" : "w-[280px]"}
        ${isCollapsed ? "items-center" : ""}
      `}
    >
      <div className="grid h-[3.7rem] justify-center items-end pb-2">
        <AccountSwitcher
          isCollapsed={isCollapsed}
          accounts={[
            {
              email: session?.user.email,
              label: session?.user.name,
              icon: (
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Gmail</title>
                  <path
                    d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
                    fill="currentColor"
                  />
                </svg>
              ),
            },
          ]}
        />
      </div>
      <nav className="grid gap-1 px-2 sm:py-2 group-[[data-collapsed=true]]:justify-center  group-[[data-collapsed=true]]:px-2 ">
        {links.map((link, index) =>
          isCollapsed ? (
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
      <div className="flex h-full w-full flex-1 flex-col justify-end">
        <SidebarQuickAction
          setSidebarActive={handleCollapse}
          isCollapsed={isCollapsed}
        />
      </div>
    </aside>
  );
}
