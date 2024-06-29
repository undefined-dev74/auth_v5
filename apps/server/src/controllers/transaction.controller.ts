import { Request, Response } from 'express';
import httpStatus from 'http-status';
import prisma from '../client';
import { SuccessResponse } from '../core/ApiResponse';
import { transactionService } from '../services';
import ApiError from '../utils/ApiError';
import catchAsync from '../utils/catchAsync';
import pick from '../utils/pick';

const createTransaction = catchAsync(async (req: Request, res: Response) => {
  const transactionData = req.body;
  const newTransaction = await transactionService.createTransaction(transactionData);
  res.status(httpStatus.CREATED).send(newTransaction);
});

const getTransactions = catchAsync(async (req: any, res) => {
  const userId = req?.user?.id;
  const userRole = req.user.role;
  const filter = pick(req.query, ['userId', 'status', 'transactionType']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  // Apply additional filter for regular users
  if (userRole !== 'ADMIN') {
    filter.userId = userId;
  }
  const result = await transactionService.queryTransactions(filter, options);
  new SuccessResponse('Transactions fetched successfully.', result).send(res);
});

const withdraw = catchAsync(async (req: any, res: Response) => {
  const userId = req.user.id;
  const { amount, investmentId } = req.body;

  // Check if the user has sufficient balance
  const balance = await transactionService.getUserBalance(userId);
  if (balance < amount) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Insufficient balance');
  }

  // Check if there is any pending withdrawal request
  const pendingWithdrawal = await transactionService.getPendingWithdrawal(userId);
  if (pendingWithdrawal) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You have a pending withdrawal request');
  }

  // Create a new withdrawal request
  const transaction = await transactionService.createWithdrawal({ investmentId, userId, amount });

  // Update the balance
  await prisma.investment.update({
    where: { id: investmentId },
    data: { balance: { decrement: amount } }
  });
  res.status(httpStatus.CREATED).send(transaction);
});

const getUserBalance = catchAsync(async (req: any, res: Response) => {
  const userId = req.user.id;

  const balance = await transactionService.getUserBalance(userId);
  res.send({ balance });
});

export default {
  createTransaction,
  getTransactions,
  withdraw,
  getUserBalance
};
