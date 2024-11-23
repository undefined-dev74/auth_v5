import express from 'express';
import { issueController } from '../../controllers';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import { issueValidation } from '../../validations';

const router = express.Router();

router
  .route('/:projectId/create')
  .post(
    auth('CREATE_ISSUE'),
    validate(issueValidation.createIssueSchema),
    issueController.createIssue
  );
//   .get(auth(), workspaceController.getWorkspaces);

// router
//   .route('/:workspaceId')
//   .get(auth('GET_WORKSPACE'), workspaceController.getWorkspace)
//   .patch(auth('UPDATE_WORKSPACE'), workspaceController.updateWorkspace)
//   .delete(auth('DELETE_WORKSPACE'), workspaceController.deleteWorkspace);

export default router;
