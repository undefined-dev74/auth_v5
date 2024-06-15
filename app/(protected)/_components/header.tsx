import { Home, Zap } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import ProfileSection from "./ProfileSection";

interface HeaderProps {
  isCollapsed: boolean;
}

const Header = ({ isCollapsed }: HeaderProps) => {
  const resolvedTheme = useTheme();
  return (
    <div className="relative z-[15] flex h-[3.75rem] w-full flex-shrink-0 flex-row items-center justify-between gap-x-2 gap-y-4 bg-custom-sidebar-background-100 p-4">
      <div className="flex items-center gap-2 overflow-ellipsis whitespace-nowrap">
        <div>
          <Home className="h-4 w-4 text-custom-text-300" />
        </div>
      </div>
      <div className="flex items-center gap-3 px-3">
        <a
          // onClick={() =>
          //   captureEvent(CHANGELOG_REDIRECTED, {
          //     element: "navbar",
          //   })
          // }
          href="https://plane.so/changelog"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-shrink-0 items-center gap-1.5 rounded bg-custom-background-80 px-3 py-1.5"
        >
          <Zap size={14} strokeWidth={2} fill="rgb(var(--color-text-100))" />
          <span className="hidden text-xs font-medium sm:hidden md:block">
            {"What's new?"}
          </span>
        </a>
        <a
          // onClick={() =>
          //   captureEvent(GITHUB_REDIRECTED, {
          //     element: "navbar",
          //   })
          // }
          className="flex flex-shrink-0 items-center gap-1.5 rounded bg-custom-background-80 px-3 py-1.5"
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
};

export default Header;
