import { Role } from '@prisma/client';

const allRoles = {
  [Role.USER]: ['CREATE_WORKSPACE', 'MANAGE_USERS'],
  [Role.ADMIN]: ['getUsers', 'MANAGE_USERS']
};

export const roles = Object.keys(allRoles);
export const roleRights = new Map(Object.entries(allRoles));
