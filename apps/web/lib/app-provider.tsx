"use client";

import { FC, ReactNode } from "react";
import { observer } from "mobx-react-lite";

import dynamic from "next/dynamic";
import Router from "next/router";
import NProgress from "nprogress";
// hooks
import { useUser } from "@/hooks/store";

// styles
import "../styles/nprogress.css";

import { SWRConfig } from "swr";
// constants
import { SWR_CONFIG } from "@/constants/swr-config";
import { THEMES } from "@/constants/themes";
import { ThemeProvider } from "next-themes";
import { ToastContextProvider } from "@/context/toast-context";
import { TooltipProvider } from "@/components/ui/tooltip";
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
    <ThemeProvider defaultTheme="system" themes={THEMES}>
      <ToastContextProvider>
        <StoreWrapper>
          <SWRConfig value={SWR_CONFIG}>
            <TooltipProvider>{children}</TooltipProvider>
          </SWRConfig>
        </StoreWrapper>
      </ToastContextProvider>
    </ThemeProvider>
  );
});
