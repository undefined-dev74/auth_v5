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
  .get(auth('GET_WORKSPACE'), workspaceController.getWorkspaces);

router
  .route('/:workspaceId')
  .get(auth('GET_WORKSPACE'), workspaceController.getWorkspace)
  .patch(auth('UPDATE_WORKSPACE'), workspaceController.updateWorkspace)
  .delete(auth('DELETE_WORKSPACE'), workspaceController.deleteWorkspace);

export default router;
