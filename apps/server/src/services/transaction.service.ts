import { Transaction, TransactionStatus, TransactionType } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';

/**
 * Create a user
 * @param {Object} data
 * @returns {Promise<Transaction>}
 */
const createTransaction = async (
  data: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Transaction> => {
  try {
    const transaction = await prisma.transaction.create({
      data
    });
    return transaction;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error creating transaction');
  }
};

/**
 * Query for transactions
 * @param {Object} filter - Prisma filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTransactions = async <Key extends keyof Transaction>(
  filter: object,
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  },
  keys: Key[] = [
    'id',
    'userId',
    'investmentId',
    'transactionType',
    'status',
    'amount',
    'status',
    'date',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<Transaction, Key>[]> => {
  const { limit = 10, page = 1, sortBy, sortType = 'desc' } = options;

  try {
    const transactions = await prisma.transaction.findMany({
      where: filter,
      select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
      skip: (page - 1) * limit,
      take: limit,
      orderBy: sortBy ? { [sortBy]: sortType } : undefined
    });

    return transactions as Pick<Transaction, Key>[];
  } catch (error) {
    console.error('Error querying transactions:', error);
    throw new Error('Failed to query transactions');
  }
};

/**
 * get user balance
 * @param {number} userId
 * @returns {Promise<number>}
 */
const getUserBalance = async (userId: number): Promise<number> => {
  const investments = await prisma.investment.findMany({
    where: { userId },
    select: { balance: true }
  });

  let totalBalance = 0;

  investments.forEach((investment) => {
    totalBalance += investment.balance;
  });

  return totalBalance;
};

/**
 * get pending withdrawals
 * @param {number} userId
 * @returns {Promise<any>}
 */
const getPendingWithdrawal = async (userId: number): Promise<any> => {
  return prisma.transaction.findFirst({
    where: {
      userId,
      status: TransactionStatus.PENDING,
      transactionType: TransactionType.WITHDRAWAL
    }
  });
};

/**
 * create new withdraw
 * @param {Object} data - Transaction
 * @returns {Promise<Transaction>}
 */

const createWithdrawal = async (
  data: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt' | 'transactionType' | 'status' | 'date'>
): Promise<Transaction> => {
  return prisma.transaction.create({
    data: {
      userId: data.userId,
      investmentId: data.investmentId,
      amount: -data.amount,
      status: TransactionStatus.PENDING,
      transactionType: TransactionType.WITHDRAWAL
    }
  });
};

export default {
  createTransaction,
  queryTransactions,
  getUserBalance,
  getPendingWithdrawal,
  createWithdrawal
};
