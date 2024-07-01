// types.ts

import { Issue, Project, User, Label, IssuePriority, IssueStatus } from '@prisma/client';

// Request payload for creating an issue
export interface CreateIssuePayload {
  title: string;
  description?: string | null;
  priority?: IssuePriority;
  assigneeId?: number | null;
  labels?: number[];
}

// Route parameters
export interface IssueRouteParams {
  projectId: string;
}

// Service layer input
export interface CreateIssueServiceInput {
  projectId: number;
  issueData: CreateIssuePayload;
  userId: number;
}

// Service layer output
export interface CreateIssueServiceOutput extends Omit<Issue, 'assigneeId' | 'reporterId'> {
  assignee: User | null;
  reporter: User | null; // Changed from User to User | null
  watchers: User[];
  statusHistory: {
    id: number;
    status: IssueStatus;
    updatedById: number;
    updatedAt: Date;
    issueId: number;
  }[];
  labels: Label[];
}

// Project with users
export interface ProjectWithUsers extends Project {
  users: {
    userId: number;
    projectId: number;
    role: 'ADMIN' | 'MEMBER' | 'VIEWER';
  }[];
}

type IssueWithRelations = Prisma.IssueGetPayload<{
  include: {
    assignee: true;
    reporter: true;
    watchers: true;
    statusHistory: true;
    labels: true;
  };
}>;

export type CreateIssueServiceOutput = IssueWithRelations;
