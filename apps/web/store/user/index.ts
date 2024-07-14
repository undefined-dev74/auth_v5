import { action, makeObservable, observable, runInAction } from "mobx";
// services

import { AuthService } from "@/services/auth.service";
import { UserService } from "@/services/user.service";
// interfaces

// store
import { IUser, IUserSettings } from "@repo/types";
import { RootStore } from "../root.store";

export interface IUserRootStore {
  // states
  currentUserError: any | null;
  currentUserLoader: boolean;
  // observables
  isUserLoggedIn: boolean | null;
  updateCurrentUser: (data: Partial<IUser>) => Promise<IUser>;
  currentUser: IUser | null;
  // fetch actions
  fetchCurrentUser: () => Promise<IUser>;
  fetchCurrentUserInstanceAdminStatus: () => Promise<boolean>;
  signOut: () => Promise<void>;
}

export class UserRootStore implements IUserRootStore {
  // states
  currentUserError: any | null = null;
  currentUserLoader: boolean = false;
  // observables
  isUserLoggedIn: boolean | null = null;
  currentUser: IUser | null = null;
  isUserInstanceAdmin: boolean | null = null;
  currentUserSettings: IUserSettings | null = null;

  dashboardInfo: any = null;
  // root store
  rootStore;
  // services
  userService;
  authService;

  constructor(_rootStore: RootStore) {
    makeObservable(this, {
      // states
      currentUserError: observable.ref,
      currentUserLoader: observable.ref,
      // observable
      currentUser: observable,
      isUserInstanceAdmin: observable.ref,

      dashboardInfo: observable,
      // action
      fetchCurrentUser: action,
      fetchCurrentUserSettings: action,
      fetchCurrentUserInstanceAdminStatus: action,
      updateCurrentUser: action,
      signOut: action,
    });
    this.rootStore = _rootStore;
    this.userService = new UserService();
    this.authService = new AuthService();
  }

  /**
   * Fetches the current user
   * @returns Promise<IUser>
   */
  fetchCurrentUser = async () => {
    try {
      this.currentUserLoader = true;
      const response = await this.userService.currentUser();
      runInAction(() => {
        this.isUserLoggedIn = true;
        this.currentUser = response;
        this.currentUserError = null;
        this.currentUserLoader = false;
      });
      return response;
    } catch (error) {
      runInAction(() => {
        this.currentUserLoader = false;
        this.currentUserError = error;
      });
      throw error;
    }
  };

  /**
   * Fetches the current user instance admin status
   * @returns Promise<boolean>
   */
  fetchCurrentUserInstanceAdminStatus = async () =>
    await this.userService.currentUserInstanceAdminStatus().then((response) => {
      runInAction(() => {
        this.isUserInstanceAdmin = response.is_instance_admin;
      });
      return response.is_instance_admin;
    });

  /**
   * Fetches the current user settings
   * @returns Promise<IUserSettings>
   */
  fetchCurrentUserSettings = async () =>
    await this.userService.currentUserSettings().then((response) => {
      runInAction(() => {
        this.currentUserSettings = response;
      });
      return response;
    });

  /**
   * Updates the current user
   * @param data
   * @returns Promise<IUser>
   */
  updateCurrentUser = async (data: Partial<IUser>) => {
    try {
      runInAction(() => {
        this.currentUser = {
          ...this.currentUser,
          ...data,
        } as IUser;
      });
      const response = await this.userService.updateUser(data);
      runInAction(() => {
        this.currentUser = response;
      });
      return response;
    } catch (error) {
      this.fetchCurrentUser();
      throw error;
    }
  };

  /**
   * Signs out the current user
   * @returns Promise<void>
   */
  signOut = async () =>
    await this.authService.signOut().then(() => {
      runInAction(() => {
        this.currentUser = null;
        this.isUserLoggedIn = false;
      });
      this.rootStore.resetOnSignout();
    });
}
