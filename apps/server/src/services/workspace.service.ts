import { Prisma, Workspace, WorkspaceInvitation } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import emailService from './email.service';

/**
 * Create a workspace
 * @param {string} name
 * @param {string} description
 * @param {number} ownerId
 * @returns {Promise<Workspace>}
 */
const createWorkspace = async (
  name: string,
  description: string | undefined,
  ownerId: number
): Promise<Workspace> => {
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  let uniqueName = name;
  let uniqueSlug = slug;

  let counter = 1;
  while (true) {
    try {
      return await prisma.workspace.create({
        data: {
          name: uniqueName,
          slug: uniqueSlug,
          description,
          owner: { connect: { id: ownerId } },
          members: {
            create: {
              userId: ownerId,
              role: 'OWNER'
            }
          }
        },
        include: {
          owner: true,
          members: true
        }
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        // P2002 is the error code for unique constraint violation
        uniqueName = `${name} (${counter})`;
        uniqueSlug = `${slug}-${counter}`;
        counter++;
      } else {
        throw error;
      }
    }
  }
};

/**
 * Query for workspaces
 * @param {Object} filter - Prisma filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<Pick<Workspace, Key>[]>}
 */
const queryWorkspaces = async <Key extends keyof Workspace>(
  filter: object,
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  },
  keys: Key[] = ['id', 'name', 'slug', 'description', 'createdAt', 'updatedAt'] as Key[]
): Promise<Pick<Workspace, Key>[]> => {
  const { limit = 10, page = 1, sortBy, sortType = 'desc' } = options;

  try {
    const workspaces = await prisma.workspace.findMany({
      where: filter,
      select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
      skip: (page - 1) * limit,
      take: limit,
      orderBy: sortBy ? { [sortBy]: sortType } : undefined
    });

    return workspaces as Pick<Workspace, Key>[];
  } catch (error) {
    console.error('Error querying Workspaces:', error);
    throw new Error('Failed to query Workspaces');
  }
};

/**
 * Get workspace by id
 * @param {number} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Workspace, Key> | null>}
 */
const getWorkspaceById = async <Key extends keyof Workspace>(
  id: number,
  keys: Key[] = ['id', 'name', 'slug', 'description', 'createdAt', 'updatedAt'] as Key[]
): Promise<Pick<Workspace, Key> | null> => {
  return prisma.workspace.findUnique({
    where: { id },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<Workspace, Key> | null>;
};

/**
 * Update workspace by id
 * @param {number} workspaceId
 * @param {Object} updateBody
 * @returns {Promise<Workspace>}
 */
const updateWorkspaceById = async <Key extends keyof Workspace>(
  workspaceId: number,
  updateBody: Prisma.WorkspaceUpdateInput,
  keys: Key[] = ['id', 'name', 'slug', 'description'] as Key[]
): Promise<Pick<Workspace, Key> | null> => {
  const workspace = await getWorkspaceById(workspaceId, ['id', 'name', 'slug']);
  if (!workspace) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Workspace not found');
  }
  const updatedWorkspace = await prisma.workspace.update({
    where: { id: workspace.id },
    data: updateBody,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  });
  return updatedWorkspace as Pick<Workspace, Key> | null;
};

/**
 * Delete workspace by id
 * @param {number} workspaceId
 * @returns {Promise<Workspace>}
 */
const deleteWorkspaceById = async (workspaceId: number): Promise<Workspace> => {
  const workspace = await getWorkspaceById(workspaceId);
  if (!workspace) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Workspace not found');
  }
  await prisma.workspace.delete({ where: { id: workspace.id } });
  return workspace;
};

/**
 * Invite a user to a workspace
 * @param {number} workspaceId
 * @param {string} email
 * @param {number} inviterId
 * @returns {Promise<WorkspaceInvitation>}
 */
const inviteUserToWorkspace = async (
  workspaceId: number,
  email: string,
  inviterId: number
): Promise<WorkspaceInvitation> => {
  const workspace = await getWorkspaceById(workspaceId);
  if (!workspace) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Workspace not found');
  }

  const inviter = await prisma.user.findUnique({ where: { id: inviterId } });
  if (!inviter) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Inviter not found');
  }

  const existingMember = await prisma.userWorkspace.findFirst({
    where: { workspaceId, user: { email } }
  });
  console.log(existingMember);
  if (existingMember) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User is already a member of this workspace');
  }

  const existingInvitation = await prisma.workspaceInvitation.findFirst({
    where: { workspaceId, email, status: 'PENDING' }
  });
  if (existingInvitation) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'An invitation has already been sent to this email');
  }

  const invitation = await prisma.workspaceInvitation.create({
    data: {
      inviterId,
      workspaceId,
      email,
      token: uuidv4(),
      expiresAt: moment().add(7, 'days').toDate() // Invitation expires in 7 days
    }
  });

  // Send invitation email
  await emailService.sendWorkspaceInvitationEmail(email, {
    inviterName: inviter.name || inviter.email,
    workspaceName: workspace.name,
    invitationLink: `${process.env.FRONTEND_URL}/accept-invitation?token=${invitation.token}&workspaceSlug=${workspace.slug}&invitationId=${invitation.id}`
  });

  return invitation;
};

/**
 * Accept a workspace invitation
 * @param {string} token
 * @param {number} userId
 * @returns {Promise<Workspace>}
 */
const acceptWorkspaceInvitation = async (token: string, userId: number): Promise<Workspace> => {
  const invitation = await prisma.workspaceInvitation.findUnique({
    where: { token },
    include: { workspace: true }
  });

  if (!invitation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invitation not found');
  }

  if (invitation.expiresAt < new Date()) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invitation has expired');
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (user.email !== invitation.email) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This invitation is for a different email address');
  }

  await prisma.userWorkspace.create({
    data: {
      userId,
      workspaceId: invitation.workspaceId,
      role: 'MEMBER'
    }
  });

  await prisma.workspaceInvitation.delete({ where: { id: invitation.id } });

  return invitation.workspace;
};

const joinWorkspaceByInvitation = async (
  token: string,
  workspaceSlug: string,
  invitationId: string,
  userId: number
) => {
  const workspace = await prisma.workspace.findUnique({
    where: { slug: workspaceSlug },
    include: { invitations: true }
  });

  if (!workspace) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Workspace not found');
  }

  const invitation = await prisma.workspaceInvitation.findUnique({
    where: { token },
    include: { workspace: true }
  });
  console.log(token, invitation);

  if (!invitation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invitation not found');
  }

  if (invitation.expiresAt < new Date()) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invitation has expired');
  }

  if (invitation.status !== 'PENDING') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invitation has already been accepted');
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (user.email !== invitation.email) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This invitation is for a different email address');
  }

  // Check if user is already a member
  const existingMember = await prisma.userWorkspace.findFirst({
    where: {
      userId,
      workspaceId: workspace.id
    }
  });

  if (existingMember) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User is already a member of this workspace');
  }

  // Join the workspace
  await prisma.$transaction([
    prisma.userWorkspace.create({
      data: {
        userId,
        workspaceId: workspace.id,
        role: 'MEMBER' // Or whatever default role you want to assign
      }
    }),
    prisma.workspaceInvitation.update({
      where: { id: Number(invitationId) },
      data: { status: 'ACCEPTED' }
    })
  ]);

  return workspace;
};

const getInvitationDetails = async (workspaceSlug: string, invitationId: string): Promise<any> => {
  const invitation = await prisma.workspaceInvitation.findFirst({
    where: {
      id: Number(invitationId),
      workspace: { slug: workspaceSlug }
    },
    include: {
      workspace: {
        select: {
          id: true,
          name: true,
          slug: true
        }
      },
      inviter: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });

  console.log(workspaceSlug, invitationId);
  console.log('Invitation query result:', invitation);

  if (!invitation) {
    console.error(
      `Invitation not found for workspaceSlug: ${workspaceSlug} and invitationId: ${invitationId}`
    );
    throw new ApiError(httpStatus.NOT_FOUND, 'Invitation not found');
  }

  if (invitation.status !== 'PENDING') {
    console.error(`Invitation status is not pending for invitationId: ${invitationId}`);
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invitation is no longer valid');
  }

  if (invitation.expiresAt && invitation.expiresAt < new Date()) {
    console.error(`Invitation has expired for invitationId: ${invitationId}`);
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invitation has expired');
  }

  return {
    id: String(invitation.id),
    email: invitation.email,
    status: invitation.status,
    role: invitation.role,
    expiresAt: invitation.expiresAt,
    workspace: invitation.workspace,
    inviter: {
      id: invitation.inviter.id,
      name: invitation.inviter.name,
      email: invitation.inviter.email
    }
  };
};

export default {
  createWorkspace,
  queryWorkspaces,
  getWorkspaceById,
  updateWorkspaceById,
  deleteWorkspaceById,
  inviteUserToWorkspace,
  acceptWorkspaceInvitation,
  joinWorkspaceByInvitation,
  getInvitationDetails
};
