import { useApplication } from "@/hooks/store";
import { observer } from "mobx-react-lite";
import React from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { BellIcon, HomeIcon, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";

interface DashboardMenuItem {
  title: string;
  label?: string;
  icon: LucideIcon;
  href?: string;
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
      href: "/",
      highlight: (pathname: string, baseUrl: string) => pathname === baseUrl,
    },
    {
      title: "Notifications",
      label: "0",
      icon: BellIcon,
      href: "/notifications",
      highlight: (pathname: string, baseUrl: string) =>
        pathname.startsWith(`${baseUrl}/notifications`),
    },
  ],
};

export const DashboardSidebarMenu = observer(() => {
  const {
    theme: { sidebarCollapsed },
  } = useApplication();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const workspaceSlug = searchParams.get("workspaceSlug") || "";
  const isCollapsed = sidebarCollapsed || false;

  return (
    <nav
      className={cn(
        "grid gap-1 px-2 py-2",
        isCollapsed ? "justify-center" : ""
      )}
    >
      {DASHBOARD_MENU_ITEMS.links.map((link, index) =>
        isCollapsed ? (
          <Tooltip key={index} delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                href={`/${workspaceSlug}${link.href}`}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-md",
                  link.highlight(pathname, `/${workspaceSlug}`)
                    ? "bg-indigo-600 text-white"
                    : "text-gray-400 hover:bg-primary hover:text-white"
                )}
              >
                <link.icon className="h-5 w-5" />
                <span className="sr-only">{link.title}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-4">
              {link.title}
              {link.label && (
                <span className="ml-auto text-gray-400">{link.label}</span>
              )}
            </TooltipContent>
          </Tooltip>
        ) : (
          <Link
            key={index}
            href={`/${workspaceSlug}${link.href}`}
            className={cn(
              "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm",
              link.highlight(pathname, `/${workspaceSlug}`)
                ? "bg-indigo-600 text-white"
                : "text-gray-400 hover:bg-primary hover:text-white"
            )}
          >
            <link.icon className="h-5 w-5" />
            {link.title}
            {link.label && (
              <span className="ml-auto text-gray-400">{link.label}</span>
            )}
          </Link>
        )
      )}
    </nav>
  );
});
