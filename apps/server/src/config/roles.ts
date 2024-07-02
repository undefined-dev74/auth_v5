import { Role } from '@prisma/client';

const allRoles = {
  [Role.USER]: [
    'CREATE_WORKSPACE',
    'MANAGE_USERS',
    'GET_WORKSPACE',
    'UPDATE_WORKSPACE',
    'DELETE_WORKSPACE',
    'CREATE_ISSUE',
    'CREATE_PROJECT'
  ],
  [Role.ADMIN]: ['getUsers', 'MANAGE_USERS', 'CREATE_ISSUE']
};

export const roles = Object.keys(allRoles);
export const roleRights = new Map(Object.entries(allRoles));
