import { enableStaticRendering } from "mobx-react-lite";
import { IUserRootStore, UserRootStore } from "./user";

enableStaticRendering(typeof window === "undefined");

export class RootStore {
  user: IUserRootStore;

  constructor() {
    this.user = new UserRootStore(this);
  }

  resetOnSignout() {
    this.user = new UserRootStore(this);
  }
}
