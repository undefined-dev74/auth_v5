import { MaxWidthWrapper } from "@app/ui";
import type { PropsWithChildren } from "react";
import { PageContent } from "./page-content";

export default function SettingsLayout({ children }: PropsWithChildren) {
  return (
    <PageContent>
      <div className="relative min-h-[calc(100vh-16px)]">
        <MaxWidthWrapper className="grid grid-cols-1 gap-5 pb-10 pt-3">
          {children}
        </MaxWidthWrapper>
      </div>
    </PageContent>
  );
}
