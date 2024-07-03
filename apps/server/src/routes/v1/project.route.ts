import express from 'express';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import { projectValidation } from '../../validations';
import { projectController } from '../../controllers';

const router = express.Router();

router
  .route('/:workspaceId/create')
  .post(
    auth('CREATE_PROJECT'),
    validate(projectValidation.createProjectSchema),
    projectController.createProject
  );

export default router;
