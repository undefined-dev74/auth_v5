import { Request } from 'express';
import catchAsync from '../utils/catchAsync';
import { CreateProjectPayload, ProjectRouteParams } from 'src/types/project';
import { projectService } from '../services';
import {
  ForbiddenResponse,
  InternalErrorResponse,
  NotFoundResponse,
  SuccessResponse
} from '../core/ApiResponse';

const createProject = catchAsync(async (req: any, res) => {
  try {
    const { workspaceId } = req.params;
    const newProject = await projectService.createProject({
      workspaceId: parseInt(workspaceId),
      projectData: req.body,
      userId: req.user.id
    });

    new SuccessResponse('Project created successfully!', newProject).send(res);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      if (error.message === 'Workspace not found') {
        new NotFoundResponse(error.message).send(res);
      }
      if (error.message === 'You do not have permission to create projects in this workspace') {
        new ForbiddenResponse(error.message).send(res);
      }
    }
    new InternalErrorResponse('Server error').send(res);
  }
});

export default { createProject };
