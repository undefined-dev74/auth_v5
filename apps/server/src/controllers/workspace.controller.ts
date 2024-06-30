import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { SuccessResponse } from '../core/ApiResponse';
import { workspaceService } from '../services';

import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';

export const createWorkspace = catchAsync(async (req: any, res: Response) => {
  const { name, description } = req.body;
  const userId = req.user.id;

  // Input validation
  if (!name) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Workspace name is required');
  }

  const newWorkspace = await workspaceService.createWorkspace(name, description, userId);
  new SuccessResponse('Workspace created successfully.', newWorkspace).send(res);
});

export const getWorkspaces = catchAsync(async (req: Request, res: Response) => {
  const filter = {}; // You can add filter logic based on query params if needed
  const options = {
    sortBy: req.query.sortBy as string,
    limit: req.query.limit ? parseInt(req.query.limit as string, 10) : 10,
    page: req.query.page ? parseInt(req.query.page as string, 10) : 1
  };

  const workspaces = await workspaceService.queryWorkspaces(filter, options);
  res.status(httpStatus.OK).json(workspaces);
});

export const getWorkspace = catchAsync(async (req: Request, res: Response) => {
  const workspace = await workspaceService.getWorkspaceById(parseInt(req.params.workspaceId, 10));
  if (!workspace) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Workspace not found');
  }
  res.status(httpStatus.OK).json(workspace);
});

export const updateWorkspace = catchAsync(async (req: Request, res: Response) => {
  const workspace = await workspaceService.updateWorkspaceById(
    parseInt(req.params.workspaceId, 10),
    req.body
  );
  res.status(httpStatus.OK).json(workspace);
});

export const deleteWorkspace = catchAsync(async (req: Request, res: Response) => {
  await workspaceService.deleteWorkspaceById(parseInt(req.params.workspaceId, 10));
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  createWorkspace,
  getWorkspaces,
  getWorkspace,
  updateWorkspace,
  deleteWorkspace
};
