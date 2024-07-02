import { Project, Workspace, User, WorkspaceRole, ProjectRole } from '@prisma/client';

// ... (keep existing types)

export interface CreateProjectPayload {
  title: string;
  key?: string;
  description?: string | null;
  scope?: 'public' | 'private';
}

export interface ProjectRouteParams {
  workspaceId: string;
}

export interface CreateProjectServiceInput {
  workspaceId: number;
  projectData: CreateProjectPayload;
  userId: number;
}

export interface CreateProjectServiceOutput extends Project {
  workspace: Workspace;
  projectLead: User;
  users: {
    userId: number;
    projectId: number;
    role: ProjectRole;
    user: User;
  }[];
}

export interface WorkspaceWithMembers extends Workspace {
  members: {
    userId: number;
    workspaceId: number;
    role: WorkspaceRole;
  }[];
}
