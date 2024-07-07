import { logout } from "@/actions/logout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useApplication, useUser } from "@/hooks/store";
import { Menu, Transition } from "@headlessui/react";
import { Settings, UserCircle2 } from "lucide-react";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Fragment, useState } from "react";
import { usePopper } from "react-popper";


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

  const workspaceSlug = query.get("workspaceSlug");

  // store hooks
  const {
    theme: { toggleMobileSidebar, sidebarCollapsed },
  } = useApplication();

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

  return (
    <>
      <Menu as="div" className="relative flex-shrink-0">
        <Menu.Button
          className="grid place-items-center outline-none"
          ref={setReferenceElement}
        >
          <Avatar className="!text-base h-8 w-8 rounded-md">
            <AvatarImage src={"https://github.com/shadcn.png"} />
            <AvatarFallback>A</AvatarFallback>
            {/* <AvatarFallback>{currentUser?.display_name}</AvatarFallback> */}
          </Avatar>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
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
                  <Menu.Item key={index} as="div">
                    <span className="flex w-full items-center gap-2 rounded px-2 py-1 hover:bg-custom-sidebar-background-80">
                      <link.icon className="h-4 w-4 stroke-[1.5]" />
                      {link.name}
                    </span>
                  </Menu.Item>
                </Link>
              ))}
            </div>
            {/* <div className={`pt-2 ${isUserInstanceAdmin ? "pb-2" : ""}`}>
                <Menu.Item
                  as="button"
                  type="button"
                  className="flex w-full items-center gap-2 rounded px-2 py-1 hover:bg-custom-sidebar-background-80"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4 stroke-[1.5]" />
                  Sign out
                </Menu.Item>
              </div>
              {isUserInstanceAdmin && (
                <div className="p-2 pb-0">
                  <Link href="/god-mode">
                    <Menu.Item as="button" type="button" className="w-full">
                      <span className="flex w-full items-center justify-center rounded bg-custom-primary-100/20 px-2 py-1 text-sm font-medium text-custom-primary-100 hover:bg-custom-primary-100/30 hover:text-custom-primary-200">
                        Enter God Mode
                      </span>
                    </Menu.Item>
                  </Link>
                </div>
              )} */}
          </Menu.Items>
        </Transition>
      </Menu>
    </>
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Avatar>
    //       <AvatarImage src="/placeholder-user.jpg" alt="user@avatar" />
    //     </Avatar>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent align="end">
    //     <DropdownMenuLabel>My Account</DropdownMenuLabel>
    //     <DropdownMenuSeparator />
    //     <DropdownMenuItem>
    //       <Link href="/settings/profile">Settings</Link>
    //     </DropdownMenuItem>
    //     <DropdownMenuItem onClick={() => logout()}>
    //       <Link href="#">Logout</Link>
    //     </DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>
  );
});

export default ProfileSection;
