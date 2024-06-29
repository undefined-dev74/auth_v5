import { InvestmentPlan } from '@prisma/client';
import httpStatus from 'http-status';
import { SuccessResponse } from '../core/ApiResponse';
import investmentService from '../services/investmentPlan.service';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import pick from '../utils/pick';

const createInvestmentPlan = catchAsync(async (req, res) => {
  const { dailyInterest, name, returnPercentage, durationDays, amount, startDate, endDate } =
    req.body;

  const investment = await investmentService.createInvestmentPlan({
    name,
    dailyInterest,
    amount,
    returnPercentage,
    durationDays,
    startDate: new Date(startDate),
    endDate: new Date(endDate)
  } as InvestmentPlan);
  res.status(httpStatus.CREATED).send(investment);
});

const getInvestmentPlans = catchAsync(async (req, res) => {
  const filter = pick(req.query, [
    'name',
    'amount',
    'returnPercentage',
    'dailyInterest',
    'status',
    'startDate',
    'endDate',
    'createdAt',
    'updatedAt',
    'minAmount',
    'maxAmount',
    'minReturnPercentage',
    'maxReturnPercentage',
    'minDailyInterest',
    'maxDailyInterest',
    'minDurationDays',
    'maxDurationDays'
  ]);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await investmentService.queryInvestments(filter, options);
  new SuccessResponse('Investments fetch successfully.', result).send(res);
});

const getInvestmentPlan = catchAsync(async (req, res) => {
  const investmentPlan = await investmentService.getInvestmentPlanById(req.params.investmentPlanId);
  if (!investmentPlan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'investmentPlan not found');
  }
  res.send(investmentPlan);
});

const updateInvestmentPlan = catchAsync(async (req, res) => {
  const user = await investmentService.updateInvestmentPlanById(
    req.params.investmentPlanId,
    req.body
  );
  res.send(user);
});

const deleteInvestmentPlan = catchAsync(async (req, res) => {
  await investmentService.deleteInvestmentPlanById(req.params.investmentPlanId);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  createInvestmentPlan,
  getInvestmentPlans,
  getInvestmentPlan,
  updateInvestmentPlan,
  deleteInvestmentPlan
};
