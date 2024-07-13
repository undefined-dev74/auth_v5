export interface IUser {
  avatar: string;
  cover_image: string | null;
  created_at: Date;
  created_location: string;
  date_joined: Date;
  email: string;
  display_name: string;
  first_name: string;
  id: string;
  is_email_verified: boolean;
  is_onboarded: boolean;
  is_tour_completed: boolean;
  last_location: string;
  last_login: Date;
  last_name: string;
  mobile_number: string;
  role: string;
  token: string;
  updated_at: Date;
  username: string;
  user_timezone: string;
  last_workspace_id: string
}

export interface IUserSettings {
  id: string;
  email: string;
  workspace: {
    last_workspace_id: string;
    last_workspace_slug: string;
    fallback_workspace_id: string;
    fallback_workspace_slug: string;
    invites: number;
  };
}

export interface IUserProfileData {
  assigned_issues: number;
  completed_issues: number;
  created_issues: number;
  pending_issues: number;
  subscribed_issues: number;
}

export interface IInstanceAdminStatus {
  is_instance_admin: boolean;
}