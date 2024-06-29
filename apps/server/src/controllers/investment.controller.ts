import { Investment } from '@prisma/client';
import httpStatus from 'http-status';

import { SuccessResponse } from '../core/ApiResponse';
import { investmentService } from '../services';
import catchAsync from '../utils/catchAsync';
import pick from '../utils/pick';

const createInvestment = catchAsync(async (req: any, res) => {
  const userId = req?.user?.id;
  const { investmentPlanId, amount } = req.body;

  const investment = await investmentService.createInvestment({
    userId,
    investmentPlanId,
    amount
  } as Investment);
  res.status(httpStatus.CREATED).send(investment);
});

const getInvestments = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['amount', 'balance']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await investmentService.queryInvestments(filter, options);
  res.send(result);
});

const getInvestmentLedger = catchAsync(async (req: any, res) => {
  const userId = req?.user?.id;

  const { investmentPlanId } = req.query;

  const entries = await investmentService.getLedgerEntriesByUserAndInvestmentPlan(
    userId,
    investmentPlanId
  );

  new SuccessResponse('Entries fetched successfully.!', entries).send(res);
});

export default {
  createInvestment,
  getInvestments,
  getInvestmentLedger
};
