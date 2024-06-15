"use client";

import { Archive, ArchiveX, File, Inbox, Send, Trash2 } from "lucide-react";
import * as React from "react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import Header from "./header";
import { Sidebar } from "./sidebar";

interface MailProps {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];

  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function Mail({ defaultCollapsed = false }: MailProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
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
    </div>
  );
}
