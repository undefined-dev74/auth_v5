import { enableStaticRendering } from "mobx-react-lite";
import { IUserRootStore, UserRootStore } from "./user";
import { AppRootStore, IAppRootStore } from "./application";
import { IWorkspaceRootStore, WorkspaceRootStore } from "./workspace";

enableStaticRendering(typeof window === "undefined");

export class RootStore {
  user: IUserRootStore;
  app: IAppRootStore;
  workspaceRoot: IWorkspaceRootStore

  constructor() {
    this.user = new UserRootStore(this);
    this.app = new AppRootStore(this);
    this.workspaceRoot = new WorkspaceRootStore(this)
  }

  resetOnSignout() {
    this.user = new UserRootStore(this);
  }
}
