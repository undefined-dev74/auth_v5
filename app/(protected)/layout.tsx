"use client";

import { ThemeProvider } from "@/components/providers";
import { Archive, ArchiveX, File, Inbox, Send, Trash2 } from "lucide-react";

import { useRef, useState } from "react";
import Header from "./_components/header";
import { Sidebar } from "./_components/sidebar";
import { SidebarHamburgerToggle } from "./_components/sidebar-hamburger-toggle";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const ref = useRef<HTMLDivElement>(null);
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className="relative flex h-screen w-full overflow-hidden">
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
        <main className="relative flex h-full w-full flex-col overflow-hidden bg-custom-background-100">
          <div className="z-[15]">
            <div className="z-10 flex w-full items-center border-b border-custom-border-200">
              <div className="block bg-custom-sidebar-background-100  py-4 pl-5 md:hidden">
                <SidebarHamburgerToggle toggleSidebar={handleCollapse} />
              </div>
              <div className="w-full">
                <Header isCollapsed={isCollapsed} />
              </div>
            </div>
          </div>
          <div className="h-full w-full overflow-hidden bg-muted">
            <div className="relative h-full w-full overflow-x-hidden overflow-y-scroll">
              {children}
            </div>
          </div>
        </main>
      </div>
      {/* {children} */}
    </ThemeProvider>
  );
};

export default ProtectedLayout;
