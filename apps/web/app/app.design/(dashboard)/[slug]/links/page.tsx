import { PageContent } from "@/ui/layout/page-content";
import WorkspaceLinksClient, {
  WorkspaceLinksPageControls,
} from "./page-client";

export default function WorkspaceLinks() {
  return (
    <PageContent
      title={
        <div className="-ml-2">
          {/* <FolderDropdown hideFolderIcon={true} /> */}
        </div>
      }
      controls={<WorkspaceLinksPageControls />}
    >
      <WorkspaceLinksClient />
    </PageContent>
  );
}
