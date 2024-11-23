import { Response } from 'express';
import { issueService } from '../services';

import catchAsync from '../utils/catchAsync';
import {
  ForbiddenResponse,
  InternalErrorResponse,
  NotFoundResponse,
  SuccessResponse
} from '../core/ApiResponse';

const createIssue = catchAsync(async (req: any, res: Response) => {
  try {
    const { projectId } = req.params;
    const newIssue = await issueService.createIssue({
      projectId: parseInt(projectId),
      issueData: req.body,
      userId: req.user.id
    });

    new SuccessResponse('Issue created successfully.!', newIssue).send(res);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      if (error.message === 'Project not found') {
        new NotFoundResponse(error.message).send(res);
        // return res.status(404).json({ message: error.message });
      }
      if (error.message === 'You do not have permission to create issues in this project') {
        new ForbiddenResponse(error.message).send(res);
        // return res.status(403).json({ message: error.message });
      }
    }
    new InternalErrorResponse('Server error').send(res);
    // res.status(500).json({ message: 'Server error' });
  }
});

export default { createIssue };
