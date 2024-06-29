import bodyParser from 'body-parser';
import express from 'express';
import { webhookController } from '../../controllers';

const router = express.Router();

router.post(
  '/webhooks',
  bodyParser.raw({ type: 'application/json' }),
  webhookController.handleWebhook
);

export default router;
