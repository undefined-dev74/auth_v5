import { IUser } from "./user";

export interface IWorkspace {
  readonly id: string;
  readonly owner: IUser;
  readonly created_at: Date;
  readonly updated_at: Date;
  name: string;
  url: string;
  logo: string | null;
  slug: string;
  readonly total_members: number;
  //   readonly slug: string;
  readonly created_by: string;
  readonly updated_by: string;
  organization_size: string;
  total_issues: number;
}
