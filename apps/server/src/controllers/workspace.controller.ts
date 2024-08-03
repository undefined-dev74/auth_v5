import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { SuccessMsgResponse, SuccessResponse } from '../core/ApiResponse';
import { workspaceService } from '../services';

import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';

export const createWorkspace = catchAsync(async (req: any, res: Response) => {
  const { name, description } = req.body;
  const userId = req.user.id;

  const newWorkspace = await workspaceService.createWorkspace(name, description, userId);
  new SuccessResponse('Workspace created successfully.', newWorkspace).send(res);
});

export const getWorkspaces = catchAsync(async (req: Request, res: Response) => {
  const filter = req.query.name ? { name: { contains: req.query.name } } : {};
  const options = {
    sortBy: req.query.sortBy as string,
    limit: req.query.limit ? parseInt(req.query.limit as string, 10) : 10,
    page: req.query.page ? parseInt(req.query.page as string, 10) : 1
  };

  const workspaces = await workspaceService.queryWorkspaces(filter, options);
  new SuccessResponse('Workspaces retrieved successfully.', workspaces).send(res);
});

export const getWorkspace = catchAsync(async (req: Request, res: Response) => {
  const workspace = await workspaceService.getWorkspaceById(parseInt(req.params.workspaceId, 10));
  if (!workspace) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Workspace not found');
  }
  new SuccessResponse('Workspace retrieved successfully.', workspace).send(res);
});

export const updateWorkspace = catchAsync(async (req: Request, res: Response) => {
  const workspace = await workspaceService.updateWorkspaceById(
    parseInt(req.params.workspaceId, 10),
    req.body
  );
  new SuccessResponse('Workspace updated successfully.', workspace).send(res);
});

export const deleteWorkspace = catchAsync(async (req: Request, res: Response) => {
  await workspaceService.deleteWorkspaceById(parseInt(req.params.workspaceId, 10));
  new SuccessMsgResponse('Workspace deleted successfully.').send(res);
});

export default {
  createWorkspace,
  getWorkspaces,
  getWorkspace,
  updateWorkspace,
  deleteWorkspace
};
