import express from 'express';
import investmentController from '../../controllers/investmentPlan.controller';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import investmentValidation from '../../validations/investmentPlan.validation';

const router = express.Router();

router
  .route('/')
  .post(
    auth('createInvestmentPlan'),
    validate(investmentValidation.createInvestmentPlan),
    investmentController.createInvestmentPlan
  )
  .get(
    auth('getInvestmentPlans'),
    validate(investmentValidation.getInvestmentPlans),
    investmentController.getInvestmentPlans
  );
router
  .route('/:investmentPlanId')
  .get(
    auth('getInvestmentPlans'),
    validate(investmentValidation.getInvestmentPlan),
    investmentController.getInvestmentPlan
  )
  .patch(
    auth('manageInvestmentPlan'),
    validate(investmentValidation.updateInvestmentPlan),
    investmentController.updateInvestmentPlan
  )
  .delete(
    auth('manageInvestmentPlan'),
    validate(investmentValidation.deleteInvestment),
    investmentController.deleteInvestmentPlan
  );

export default router;
