import { enableStaticRendering } from "mobx-react-lite";
import { IUserRootStore, UserRootStore } from "./user";
import { AppRootStore, IAppRootStore } from "./application";
import { IWorkspaceRootStore, WorkspaceRootStore } from "./workspace";
import { EventTrackerStore, IEventTrackerStore } from "./event-tracker-store";

enableStaticRendering(typeof window === "undefined");

export class RootStore {
  user: IUserRootStore;
  app: IAppRootStore;
  workspaceRoot: IWorkspaceRootStore;
  eventTracker: IEventTrackerStore;
  //FIXME: fix this assignment with actual root store
  projectRoot: any;
  state: any;

  constructor() {
    this.user = new UserRootStore(this);
    this.app = new AppRootStore(this);
    this.workspaceRoot = new WorkspaceRootStore(this);
    this.eventTracker = new EventTrackerStore(this);
  }

  resetOnSignout() {
    this.user = new UserRootStore(this);
  }
}
