import { Prisma, Workspace, User } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';

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
  let slug = name.toLowerCase().replace(/\s+/g, '-');

  // Ensure the slug is unique by appending a number if needed
  let existingWorkspace = await prisma.workspace.findUnique({
    where: { slug }
  });
  let counter = 1;
  while (existingWorkspace) {
    slug = `${name.toLowerCase().replace(/\s+/g, '-')}-${counter}`;
    existingWorkspace = await prisma.workspace.findUnique({
      where: { slug }
    });
    counter++;
  }
  return prisma.workspace.create({
    data: {
      name,
      slug,
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

export default {
  createWorkspace,
  queryWorkspaces,
  getWorkspaceById,
  updateWorkspaceById,
  deleteWorkspaceById
};
