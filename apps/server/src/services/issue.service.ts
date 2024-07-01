// services/issueService.ts

import prisma from '../client';
import {
  CreateIssueServiceInput,
  CreateIssueServiceOutput,
  ProjectWithUsers
} from '../types/issue';

class IssueService {
  async createIssue({
    projectId,
    issueData,
    userId
  }: CreateIssueServiceInput): Promise<CreateIssueServiceOutput> {
    const project = await this.getProject(projectId);

    if (!project) {
      throw new Error('Project not found');
    }

    this.validateUserPermission(project, userId);

    const newIssue = await prisma.issue.create({
      data: {
        title: issueData.title,
        description: issueData.description,
        priority: issueData.priority || 'MEDIUM',
        project: { connect: { id: projectId } },
        assignee: issueData.assigneeId ? { connect: { id: issueData.assigneeId } } : undefined,
        reporter: { connect: { id: userId } },
        watchers: { connect: [{ id: userId }] },
        statusHistory: {
          create: {
            status: 'TODO',
            updatedBy: { connect: { id: userId } }
          }
        },
        labels: issueData.labels
          ? {
              connect: issueData.labels.map((labelId) => ({ id: labelId }))
            }
          : undefined
      },
      include: {
        assignee: true,
        reporter: true,
        watchers: true,
        statusHistory: true,
        labels: true
      }
    });

    return newIssue as CreateIssueServiceOutput;
  }

  async getProject(projectId: number): Promise<ProjectWithUsers | null> {
    return prisma.project.findUnique({
      where: { id: projectId },
      include: { users: true }
    });
  }

  validateUserPermission(project: ProjectWithUsers, userId: number): void {
    const userProject = project.users.find((up) => up.userId === userId);
    if (!userProject) {
      throw new Error('You do not have permission to create issues in this project');
    }
  }
}

export default new IssueService();
