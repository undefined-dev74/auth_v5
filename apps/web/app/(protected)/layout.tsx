"use client";

import { ThemeProvider } from "@/components/providers";
import {
  Archive,
  ArchiveX,
  ArrowRightLeft,
  BarChart2,
  BellIcon,
  HomeIcon,
  Trash2,
} from "lucide-react";

import { useRef, useState } from "react";


import { Sidebar, Header } from "@/layouts/app-layout";

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
    <div className="h-screen w-full overflow-hidden">
      
    <div className="flex h-full w-full overflow-hidden">
      <Sidebar
        setIsCollapsed={setIsCollapsed}
        isCollapsed={isCollapsed}
        links={[
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
        ]}
      />
      <main className="relative flex h-full w-full flex-col overflow-hidden bg-[#191919]">
        <div className="z-[15]">
          <div className="z-10 flex w-full items-center border-b border-custom-border-200">
            <div className="w-full">
              <Header />
            </div>
          </div>
        </div>
        <div className="h-full w-full overflow-hidden bg-[#202020]">
          <div className="relative h-full w-full overflow-x-hidden overflow-y-scroll">
            {children}
          </div>
        </div>
      </main>
    </div>
    </div>
  );
};

export default ProtectedLayout;
