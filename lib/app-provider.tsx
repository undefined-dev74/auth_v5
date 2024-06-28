"use client";
import { observer } from "mobx-react-lite";
import { ThemeProvider } from "next-themes";
import dynamic from "next/dynamic";
import Router from "next/router";
import NProgress from "nprogress";
import { FC, ReactNode } from "react";
// hooks
import { useUser } from "@/hooks/store";

import { SWRConfig } from "swr";
// constants
import { SWR_CONFIG } from "@/constants/swr-config";
import { THEMES } from "@/constants/themes";
// dynamic imports
const StoreWrapper = dynamic(() => import("@/lib/wrappers/store-wrapper"), {
  ssr: false,
});

// nprogress
NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", NProgress.start);
Router.events.on("routeChangeError", NProgress.done);
Router.events.on("routeChangeComplete", NProgress.done);

export interface IAppProvider {
  children: ReactNode;
}

export const AppProvider: FC<IAppProvider> = observer((props) => {
  const { children } = props;
  // store hooks
  const { currentUser } = useUser();

  return (
    <ThemeProvider themes={THEMES} defaultTheme="system">
      <StoreWrapper>
        <SWRConfig value={SWR_CONFIG}>{children}</SWRConfig>
      </StoreWrapper>
    </ThemeProvider>
  );
});
