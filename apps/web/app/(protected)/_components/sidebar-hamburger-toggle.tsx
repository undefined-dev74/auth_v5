import { FC } from "react";

import { Menu } from "lucide-react";

type Props = {
  onClick?: () => void;
  toggleSidebar?: () => void;
};

export const SidebarHamburgerToggle: FC<Props> = (props) => {
  const { onClick, toggleSidebar } = props;

  return (
    <div
      className="group flex h-7 w-7 flex-shrink-0 cursor-pointer items-center justify-center rounded bg-custom-background-80 transition-all hover:bg-custom-background-90 md:hidden"
      onClick={() => {
        if (onClick) onClick();
        // else toggleSidebar();
      }}
    >
      <Menu
        size={14}
        className="text-custom-text-200 transition-all group-hover:text-custom-text-100"
      />
    </div>
  );
};
