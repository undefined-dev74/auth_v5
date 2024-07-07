
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useApplication, useUser } from "@/hooks/store";
import useToast from "@/hooks/use-toast";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { LogOut, Settings, UserCircle2 } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Fragment, useState } from "react";

import { usePopper } from "react-popper";
import { mutate } from "swr";


const profileLinks = (workspaceSlug: string, userId: string) => [
  {
    name: "View profile",
    icon: UserCircle2,
    link: `/${workspaceSlug}/profile/${userId}`,
  },
  {
    name: "Settings",
    icon: Settings,
    link: "/profile",
  },
];

const ProfileSection = observer(() => {
  const query = useSearchParams();
  const router = useRouter()
  const workspaceSlug = query.get("workspaceSlug");

  // store hooks
  const {
    theme: { toggleMobileSidebar, sidebarCollapsed },
  } = useApplication();
  const { setTheme } = useTheme();
  
  // hooks
  const { setToastAlert } = useToast();
  

  // popper-js refs
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );

  const { currentUser, updateCurrentUser, signOut } = useUser();

  // popper-js init
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "right",
    modifiers: [
      {
        name: "preventOverflow",
        options: {
          padding: 12,
        },
      },
    ],
  });

  const handleItemClick = () => {
    if (window.innerWidth < 768) {
      toggleMobileSidebar();
    }
  };
  
  const handleSignOut = async () => {
    await signOut()
      .then(() => {
        mutate("CURRENT_USER_DETAILS", null);
        setTheme("system");
        router.push("/");
      })
      .catch(() =>
        setToastAlert({
          type: "error",
          title: "Error!",
          message: "Failed to sign out. Please try again.",
        })
      );
  };

  return (
    <>
      <Menu as="div" className="relative flex-shrink-0">
        <MenuButton
          className="grid place-items-center outline-none"
          ref={setReferenceElement}
        >
          <Avatar className="!text-base h-8 w-8 rounded-md">
            <AvatarImage src={"https://github.com/shadcn.png"} />
          
            <AvatarFallback>{currentUser?.display_name}</AvatarFallback>
          </Avatar>
        </MenuButton>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems
            className="absolute left-0 z-20 mt-1 flex w-52 origin-top-left  flex-col divide-y
          divide-custom-sidebar-border-200 rounded-md border border-custom-sidebar-border-200 bg-[#191919] px-1 py-2 text-xs shadow-lg outline-none"
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            <div className="flex flex-col gap-2.5 pb-2">
              <span className="px-2 text-[#a3a3a3]">
                {/* {currentUser?.email} */}
                john.doe@gmail.com
              </span>
              {profileLinks(
                workspaceSlug?.toString() ?? "",
                currentUser?.id ?? ""
              ).map((link, index) => (
                <Link
                  key={index}
                  href={link.link}
                  onClick={() => {
                    if (index == 0) handleItemClick();
                  }}
                >
                  <MenuItem key={index} as="div">
                    <span className="flex w-full items-center gap-2 rounded px-2 py-1 hover:bg-custom-sidebar-background-80">
                      <link.icon className="h-4 w-4 stroke-[1.5]" />
                      {link.name}
                    </span>
                  </MenuItem>
                </Link>
              ))}
            </div>
            <div className={`pt-2  pb-2}`}>
                <MenuItem
                  as="button"
                  type="button"
                  className="flex w-full items-center gap-2 rounded px-2 py-1 hover:bg-custom-sidebar-background-80"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4 stroke-[1.5]" />
                  Sign out
                </MenuItem>
              </div>
          </MenuItems>
        </Transition>
      </Menu>
    </>
  );
});

export default ProfileSection;
