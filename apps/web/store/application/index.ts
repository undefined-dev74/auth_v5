import { RootStore } from "@/store/root.store";
import { AppConfigStore, IAppConfigStore } from "./app-config.store";

// import { EventTrackerStore, IEventTrackerStore } from "../event-tracker.store";
// import { EventTrackerStore, IEventTrackerStore } from "./event-tracker.store";
// import { InstanceStore, IInstanceStore } from "./instance.store";
import { RouterStore, IRouterStore } from "./router.store";
import { IThemeStore, ThemeStore } from "./theme.store";


export interface IAppRootStore {
  config: IAppConfigStore;
  theme: IThemeStore;
  router: IRouterStore;
}

export class AppRootStore implements IAppRootStore {
  config: IAppConfigStore;
  theme: IThemeStore;
  router: IRouterStore;

  constructor(_rootStore: RootStore) {
    this.router = new RouterStore();
    this.config = new AppConfigStore();
    this.theme = new ThemeStore();
  }
}
