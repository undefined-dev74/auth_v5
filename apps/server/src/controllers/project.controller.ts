import { Request } from 'express';
import catchAsync from '../utils/catchAsync';
import { CreateProjectPayload, ProjectRouteParams } from 'src/types/project';
import { projectService } from '../services';

const createProject = catchAsync(async (req: any, res) => {
  try {
    const { workspaceId } = req.params;
    const newProject = await projectService.createProject({
      workspaceId: parseInt(workspaceId),
      projectData: req.body,
      userId: req.user.id
    });
    res.status(201).json(newProject);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      if (error.message === 'Workspace not found') {
        return res.status(404).json({ message: error.message });
      }
      if (error.message === 'You do not have permission to create projects in this workspace') {
        return res.status(403).json({ message: error.message });
      }
    }
    res.status(500).json({ message: 'Server error' });
  }
});

export default { createProject };
