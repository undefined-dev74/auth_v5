import express from 'express';
import { transactionController } from '../../controllers';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import { transactionValidation } from '../../validations';

const router = express.Router();

/**
 * @route POST /v1/transaction
 * @desc Create a new transaction
 */
router
  .route('/')
  .post(
    auth('createTransaction'),
    validate(transactionValidation.createTransaction),
    transactionController.createTransaction
  )
  .get(
    auth('getTransactions'),
    validate(transactionValidation.getTransactions),
    transactionController.getTransactions
  );

router.post(
  '/withdraw',
  auth('withdraw'),
  validate(transactionValidation.withdraw),
  transactionController.withdraw
);

router.get('/get-user-balance', auth('getTransactions'), transactionController.getUserBalance);

export default router;
