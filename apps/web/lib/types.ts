import type { Project } from "@prisma/client";

export interface UserProps {
  id: string;
  name: string;
  email: string;
  image?: string;
  createdAt: Date;
  source: string | null;
  defaultWorkspace?: string;
  defaultPartnerId?: string;
  isMachine: boolean;
  hasPassword: boolean;
  provider: string | null;
}

export interface WorkspaceUserProps extends UserProps {
  role: RoleProps;
}

export const roles = ["owner", "member"] as const;

export type RoleProps = (typeof roles)[number];

export interface WorkspaceProps extends Project {
  logo: string | null;
  domains: {
    id: string;
    slug: string;
    primary: boolean;
    verified: boolean;
  }[];
  users: {
    role: RoleProps;
    defaultFolderId: string | null;
  }[];
  store: Record<string, string> | null;
}

export const plans = [
  "free",
  "pro",
  "business",
  "business plus",
  "business extra",
  "business max",
  "advanced",
  "enterprise",
] as const;

export type BetaFeatures = "noDubLink" | "abTesting";

export interface WorkspaceProps extends Project {
  logo: string | null;
  domains: {
    id: string;
    slug: string;
    primary: boolean;
    verified: boolean;
  }[];
  users: {
    role: RoleProps;
    defaultFolderId: string | null;
  }[];
  flags?: {
    [key in BetaFeatures]: boolean;
  };
  store: Record<string, any> | null;
}

export type WorkspaceWithUsers = Omit<WorkspaceProps, "domains">;

export type PlanProps = (typeof plans)[number];

export interface SimpleLinkProps {
  domain: string;
  key: string;
  url: string;
}
