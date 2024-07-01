import { Request, Response } from 'express';
import { issueService } from '../services';
import { CreateIssuePayload, IssueRouteParams } from '../types/issue';
import catchAsync from '../utils/catchAsync';

const createIssue = catchAsync(async (req: any, res: Response) => {
  try {
    const { projectId } = req.params;
    const newIssue = await issueService.createIssue({
      projectId: parseInt(projectId),
      issueData: req.body,
      userId: req.user.id
    });
    res.status(201).json(newIssue);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      if (error.message === 'Project not found') {
        return res.status(404).json({ message: error.message });
      }
      if (error.message === 'You do not have permission to create issues in this project') {
        return res.status(403).json({ message: error.message });
      }
    }
    res.status(500).json({ message: 'Server error' });
  }
});

export default { createIssue };
