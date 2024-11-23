import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { SuccessMsgResponse, SuccessResponse } from '../core/ApiResponse';
import { workspaceService } from '../services';

import ApiError from '@/utils/ApiError';
import catchAsync from '@/utils/catchAsync';

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

export const inviteUserToWorkspace = catchAsync(async (req: any, res: Response) => {
  const invitation = await workspaceService.inviteUserToWorkspace(
    Number(req.params.workspaceId),
    req.body.email,
    req.user?.id
  );
  new SuccessResponse('Invitation sent successfully.', invitation).send(res);
});

export const acceptWorkspaceInvitation = catchAsync(async (req: any, res: Response) => {
  const workspace = await workspaceService.acceptWorkspaceInvitation(req.body.token, req.user?.id);
  new SuccessResponse('Invitation accepted successfully.', workspace).send(res);
});

export const joinWorkspace = catchAsync(async (req: any, res: Response) => {
  const { token } = req.body;
  const { workspaceSlug, invitationId } = req.params;
  const userId = req.user.id;

  const workspace = await workspaceService.joinWorkspaceByInvitation(
    token,
    workspaceSlug,
    invitationId,
    userId
  );

  if (!workspace) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Workspace or invitation not found');
  }

  new SuccessResponse('Invitation accepted successfully.', workspace).send(res);
});

export const getWorkspaceInvitation = catchAsync(async (req: Request, res: Response) => {
  const { workspaceSlug, invitationId } = req.params;

  const invitationDetails = await workspaceService.getInvitationDetails(
    workspaceSlug,
    invitationId
  );

  res.send(invitationDetails);
});
