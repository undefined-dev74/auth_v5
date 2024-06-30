import express from 'express';
import { workspaceController } from '../../controllers';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import { workspaceValidation } from '../../validations';

const router = express.Router();

router
  .route('/')
  .post(
    auth('CREATE_WORKSPACE'),
    validate(workspaceValidation.createWorkspace),
    workspaceController.createWorkspace
  )
  .get(auth(), workspaceController.getWorkspaces);

router
  .route('/:workspaceId')
  .get(auth(), workspaceController.getWorkspace)
  .patch(auth(), workspaceController.updateWorkspace)
  .delete(auth(), workspaceController.deleteWorkspace);

export default router;
