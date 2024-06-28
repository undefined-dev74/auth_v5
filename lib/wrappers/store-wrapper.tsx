import { useUser } from "@/hooks/store/use-user";
import { observer } from "mobx-react-lite";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { FC, ReactNode, useEffect, useState } from "react";
// hooks

// helpers

interface IStoreWrapper {
  children: ReactNode;
}

const StoreWrapper: FC<IStoreWrapper> = observer((props) => {
  const { children } = props;
  // states
  const [dom, setDom] = useState<any>();
  // router
  const router = useRouter();
  // store hooks
  //   const {
  //     config: { fetchAppConfig },
  //     theme: { sidebarCollapsed, toggleSidebar },
  //     router: { setQuery },
  //   } = useApplication();
  const { currentUser } = useUser();
  // fetching application Config
  //   useSWR("APP_CONFIG", () => fetchAppConfig(), {
  //     revalidateIfStale: false,
  //     revalidateOnFocus: false,
  //   });
  // theme
  const { setTheme } = useTheme();

  /**
   * Sidebar collapsed fetching from local storage
   */
  useEffect(() => {
    const localValue =
      localStorage && localStorage.getItem("app_sidebar_collapsed");
    const localBoolValue = localValue
      ? localValue === "true"
        ? true
        : false
      : false;
  }, [currentUser, setTheme]);

  /**
   * Setting up the theme of the user by fetching it from local storage
   */
  useEffect(() => {
    if (!currentUser) return;
    if (window)
      setDom(
        window.document?.querySelector<HTMLElement>("[data-theme='custom']")
      );
  }, [currentUser, setTheme, dom]);

  useEffect(() => {
    if (!router.query) return;
  }, [router.query]);

  return <>{children}</>;
});

export default StoreWrapper;
