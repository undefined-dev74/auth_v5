import { PrismaClient, User, ProjectRole } from '@prisma/client';
import {
  CreateProjectServiceInput,
  CreateProjectServiceOutput,
  WorkspaceWithMembers,
  SafeUser
} from '../types/project';

const prisma = new PrismaClient();

class ProjectService {
  async createProject({
    workspaceId,
    projectData,
    userId
  }: CreateProjectServiceInput): Promise<CreateProjectServiceOutput> {
    const workspace = await this.getWorkspace(workspaceId);

    if (!workspace) {
      throw new Error('Workspace not found');
    }

    this.validateUserPermission(workspace, userId);

    const newProject = await prisma.project.create({
      data: {
        title: projectData.title,
        key: projectData.key,
        description: projectData.description,
        scope: projectData.scope || 'public',
        workspace: { connect: { id: workspaceId } },
        projectLead: { connect: { id: userId } },
        users: {
          create: [
            {
              user: { connect: { id: userId } },
              role: 'MEMBER' as ProjectRole // Set to MEMBER by default
            }
          ]
        }
      },
      include: {
        workspace: true,
        projectLead: true,
        users: {
          include: {
            user: true
          }
        }
      }
    });

    // Filter out sensitive information
    const safeProject: CreateProjectServiceOutput = {
      ...newProject,
      projectLead: this.getSafeUser(newProject.projectLead),
      users: newProject.users.map((u) => ({
        ...u,
        user: this.getSafeUser(u.user)
      }))
    };

    return safeProject;
  }

  async getWorkspace(workspaceId: number): Promise<WorkspaceWithMembers | null> {
    return prisma.workspace.findUnique({
      where: { id: workspaceId },
      include: { members: true }
    });
  }

  validateUserPermission(workspace: WorkspaceWithMembers, userId: number): void {
    const userWorkspace = workspace.members.find((m: any) => m.userId === userId);
    if (!userWorkspace || !['OWNER', 'ADMIN'].includes(userWorkspace.role)) {
      throw new Error('You do not have permission to create projects in this workspace');
    }
  }

  getSafeUser(user: User): SafeUser {
    const { ...safeUser } = user;
    return safeUser;
  }
}

export default new ProjectService();
