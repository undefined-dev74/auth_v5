import { Home, Zap } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import ProfileSection from "@/components/profile/ProfileSection";
import { useApplication } from "@/hooks/store";
import { observe } from "mobx";
import { observer } from "mobx-react-lite";

interface HeaderProps {
  isCollapsed: boolean;
}

export const Header = observer(() => {
  const { resolvedTheme } = useTheme();

  return (
    <div className="relative z-[15] flex h-[3.75rem] w-full flex-shrink-0 flex-row items-center justify-between gap-x-2 gap-y-4 bg-background p-4">
      <div className="flex items-center gap-2 overflow-ellipsis whitespace-nowrap">
        <div>
          <Home className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      <div className="flex items-center gap-3 px-3">
        <a
          href="https://plane.so/changelog"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-shrink-0 items-center gap-1.5 rounded bg-secondary px-3 py-1.5"
        >
          <Zap size={14} strokeWidth={2} fill="currentColor" />
          <span className="hidden text-xs font-medium sm:hidden md:block">
            {"What's new?"}
          </span>
        </a>
        <a
          className="flex flex-shrink-0 items-center gap-1.5 rounded bg-secondary px-3 py-1.5"
          href="https://github.com/makeplane/plane"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={
              resolvedTheme === "dark"
                ? "/logo/github-white.png"
                : "/logo/github-black.png"
            }
            height={16}
            width={16}
            alt="GitHub Logo"
          />
          <span className="hidden text-xs font-medium sm:hidden md:block">
            Star us on GitHub
          </span>
        </a>
        <ProfileSection />
      </div>
    </div>
  );
});