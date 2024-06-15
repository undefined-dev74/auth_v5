"use client";

import { ThemeProvider } from "@/components/providers";
import { Archive, ArchiveX, File, Inbox, Send, Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { useState } from "react";
import Header from "./_components/header";
import { Sidebar } from "./_components/sidebar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className="h-full min-h-screen w-full flex-col md:flex bg/muted">
        <div className="flex h-full max-h-full ">
          <div
            className={cn(
              "flex flex-col",
              isCollapsed ? "w-[52px]" : "w-[155px]",
              "transition-all duration-300 ease-in-out"
            )}
          >
            <div
              className={cn(
                "flex h-[52px] items-center justify-between px-2",
                isCollapsed ? "justify-center" : "px-2"
              )}
            ></div>
            {/* <Separator /> */}
            <Sidebar
              setIsCollapsed={setIsCollapsed}
              isCollapsed={isCollapsed}
              links={[
                {
                  title: "Inbox",
                  label: "128",
                  icon: Inbox,
                  variant: "default",
                },
                {
                  title: "Drafts",
                  label: "9",
                  icon: File,
                  variant: "ghost",
                },
                {
                  title: "Sent",
                  label: "",
                  icon: Send,
                  variant: "ghost",
                },
                {
                  title: "Junk",
                  label: "23",
                  icon: ArchiveX,
                  variant: "ghost",
                },
                {
                  title: "Trash",
                  label: "",
                  icon: Trash2,
                  variant: "ghost",
                },
                {
                  title: "Archive",
                  label: "",
                  icon: Archive,
                  variant: "ghost",
                },
              ]}
            />

            {/* <Separator /> */}
          </div>
          <Header isCollapsed={isCollapsed} />
          {/* <div className="flex flex-col sm:gap-4 sm:pl-14">
        </div> */}
          {/* <main
            className={cn(
              "grid items-start gap-4 p-4 sm:px-4 sm:py:4 md:gap-8 ",
              isCollapsed ? "w-[calc(100%-52px)]" : ""
            )}
          >
            {children}
          </main> */}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ProtectedLayout;
