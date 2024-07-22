import { useState, FC, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";
import { Disclosure, Transition } from "@headlessui/react";
import { observer } from "mobx-react-lite";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
// hooks
import { useApplication, useEventTracker, useUser } from "@/hooks/store";
import useToast from "@/hooks/use-toast";
// components
// import { CreateProjectModal, ProjectSidebarListItem } from "components/project";
// helpers
// import { copyUrlToClipboard } from "helpers/string.helper";
// constants
import { EUserWorkspaceRoles } from "@/constants/workspace";

export const ProjectSidebarList: FC = observer(() => {
  // states
  const [isFavoriteProjectCreate, setIsFavoriteProjectCreate] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // scroll animation state
  const pathname = usePathname();
  // refs
  const containerRef = useRef<HTMLDivElement | null>(null);

  const {
    theme: { sidebarCollapsed },
    // commandPalette: { toggleCreateProjectModal },
  } = useApplication();
  const { setTrackElement } = useEventTracker();
  const {
    // membership: { currentWorkspaceRole },
  } = useUser();
  //   const {
  //     joinedProjectIds: joinedProjects,
  //     favoriteProjectIds: favoriteProjects,
  //     orderProjectsWithSortOrder,
  //     updateProjectView,
  //   } = useProject();
  // router
  const router = useRouter();
  const { workspaceSlug } = pathname as any;
  // toast
  const { setToastAlert } = useToast();

  //   const isAuthorizedUser =
  //     !!currentWorkspaceRole &&
  //     currentWorkspaceRole >= EUserWorkspaceRoles.MEMBER;

  const handleCopyText = (projectId: string) => {
    // copyUrlToClipboard(`${workspaceSlug}/projects/${projectId}/issues`).then(
    //   () => {
    //     setToastAlert({
    //       type: "success",
    //       title: "Link Copied!",
    //       message: "Project link copied to clipboard.",
    //     });
    //   }
    // );
  };

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination || !workspaceSlug) return;

    if (source.index === destination.index) return;

    // const updatedSortOrder = orderProjectsWithSortOrder(
    //   source.index,
    //   destination.index,
    //   draggableId
    // );

    // updateProjectView(workspaceSlug.toString(), draggableId, {
    //   sort_order: updatedSortOrder,
    // }).catch(() => {
    //   setToastAlert({
    //     type: "error",
    //     title: "Error!",
    //     message: "Something went wrong. Please try again.",
    //   });
    // });
  };

  const isCollapsed = sidebarCollapsed || false;

  /**
   * Implementing scroll animation styles based on the scroll length of the container
   */
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollTop = containerRef.current.scrollTop;
        setIsScrolled(scrollTop > 0);
      }
    };
    const currentContainerRef = containerRef.current;
    if (currentContainerRef) {
      currentContainerRef.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (currentContainerRef) {
        currentContainerRef.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

   return (
     <>
       <div
         ref={containerRef}
         className={`h-full space-y-2 overflow-y-auto px-4 ${
           isScrolled ? "border-t border-border" : ""
         }`}
       >
         <DragDropContext onDragEnd={onDragEnd}>
           <Droppable droppableId="favorite-projects">
             {(provided) => (
               <div ref={provided.innerRef} {...provided.droppableProps}>
                 <Disclosure as="div" className="flex flex-col" defaultOpen>
                   {({ open }) => (
                     <>
                       {!isCollapsed && (
                         <div className="group flex w-full items-center justify-between rounded p-1.5 text-xs text-muted-foreground hover:bg-secondary">
                           <Disclosure.Button
                             as="button"
                             type="button"
                             className="group flex w-full items-center gap-1 whitespace-nowrap rounded px-1.5 text-left text-sm font-semibold text-muted-foreground hover:bg-secondary"
                           >
                             Favorites
                             {open ? (
                               <ChevronDown className="h-3.5 w-3.5" />
                             ) : (
                               <ChevronRight className="h-3.5 w-3.5" />
                             )}
                           </Disclosure.Button>
                           <button
                             className="opacity-0 group-hover:opacity-100"
                             onClick={() => {
                               setTrackElement("APP_SIDEBAR_FAVORITES_BLOCK");
                               setIsFavoriteProjectCreate(true);
                               setIsProjectModalOpen(true);
                             }}
                           >
                             <Plus className="h-3 w-3" />
                           </button>
                         </div>
                       )}
                       {provided.placeholder}
                     </>
                   )}
                 </Disclosure>
               </div>
             )}
           </Droppable>
         </DragDropContext>
         <DragDropContext onDragEnd={onDragEnd}>
           <Droppable droppableId="joined-projects">
             {(provided) => (
               <div ref={provided.innerRef} {...provided.droppableProps}>
                 <Disclosure as="div" className="flex flex-col" defaultOpen>
                   {({ open }) => (
                     <>
                       {!isCollapsed && (
                         <div className="group flex w-full items-center justify-between rounded p-1.5 text-xs text-muted-foreground hover:bg-secondary">
                           <Disclosure.Button
                             as="button"
                             type="button"
                             className="group flex w-full items-center gap-1 whitespace-nowrap rounded px-1.5 text-left text-sm font-semibold text-muted-foreground hover:bg-secondary"
                           >
                             Your projects
                             {open ? (
                               <ChevronDown className="h-3.5 w-3.5" />
                             ) : (
                               <ChevronRight className="h-3.5 w-3.5" />
                             )}
                           </Disclosure.Button>
                           <button
                             className="opacity-0 group-hover:opacity-100"
                             onClick={() => {
                               setTrackElement("Sidebar");
                               setIsFavoriteProjectCreate(false);
                               setIsProjectModalOpen(true);
                             }}
                           >
                             <Plus className="h-3 w-3" />
                           </button>
                         </div>
                       )}
                       <Transition
                         enter="transition duration-100 ease-out"
                         enterFrom="transform scale-95 opacity-0"
                         enterTo="transform scale-100 opacity-100"
                         leave="transition duration-75 ease-out"
                         leaveFrom="transform scale-100 opacity-100"
                         leaveTo="transform scale-95 opacity-0"
                       >
                         <Disclosure.Panel as="div" className="space-y-2">
                           {/* Disclosure panel content */}
                         </Disclosure.Panel>
                       </Transition>
                       {provided.placeholder}
                     </>
                   )}
                 </Disclosure>
               </div>
             )}
           </Droppable>
         </DragDropContext>

         <button
           type="button"
           className="flex w-full items-center gap-2 px-3 text-sm text-muted-foreground"
           onClick={() => {
             setTrackElement("Sidebar");
           }}
         >
           <Plus className="h-5 w-5" />
           {!isCollapsed && "Add Project"}
         </button>
       </div>
     </>
   );
});
