import {
  Investment,
  InvestmentLedger,
  InvestmentPlan,
  TransactionStatus,
  TransactionType
} from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';

/**
 * Create a investment
 * @param {Object} payload
 * @returns {Promise<Investment>}
 */
const createInvestment = async (payload: Investment): Promise<Investment> => {
  const { userId, investmentPlanId, amount } = payload;

  // Fetch the InvestmentPlan to get its endDate
  const investmentPlan = await prisma.investmentPlan.findUnique({
    where: { id: investmentPlanId },
    select: { endDate: true, amount: true, dailyInterest: true, durationDays: true }
  });

  if (!investmentPlan) {
    throw new Error('InvestmentPlan not found');
  }

  // Check if the investment amount is within the allowed limit
  if (amount > investmentPlan.amount) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Investment amount exceeds the maximum limit for this plan'
    );
  }
  // Check if the user has already made an investment in the same investment plan
  const existingInvestment = await prisma.investment.findFirst({
    where: {
      userId,
      investmentPlanId
    }
  });

  if (existingInvestment) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User has already made an investment in this plan');
  }

  const dailyInterestRate = investmentPlan.dailyInterest / 100;
  const totalInterest = amount * dailyInterestRate * investmentPlan.durationDays;
  const expectedReturn = amount + totalInterest;

  const newInvestment = await prisma.$transaction(async (prisma) => {
    const createdInvestment = await prisma.investment.create({
      data: {
        user: {
          connect: { id: userId }
        },
        investmentPlan: {
          connect: { id: investmentPlanId }
        },
        amount,
        endDate: investmentPlan.endDate,
        expectedReturn
      }
    });

    await prisma.transaction.create({
      data: {
        userId,
        investmentId: createdInvestment.id,
        transactionType: TransactionType.CREDIT,
        amount,
        status: TransactionStatus.SUCCESSFUL,
        date: new Date()
      }
    });

    console.log('NEW INVESTMENT🚀', createdInvestment);
    // Generate ledger entries
    const ledgerEntries = generateLedgerEntries(createdInvestment, investmentPlan);

    // Create ledger entries in a batch
    await prisma.investmentLedger.createMany({ data: ledgerEntries });
    // Generate ledger entries

    return createdInvestment;
  });

  return newInvestment;
};

export const updateDailyEarnings = async () => {
  const investments = await prisma.investment.findMany({
    include: { investmentPlan: true }
  });

  for (const investment of investments) {
    const dailyEarning = investment.amount * (investment.investmentPlan.dailyInterest / 100);
    const newBalance = investment.balance + dailyEarning;

    // Update the investment balance
    await prisma.investment.update({
      where: { id: investment.id },
      data: { balance: newBalance }
    });

    // Create a transaction record for the daily earning
    await prisma.transaction.create({
      data: {
        userId: investment.userId,
        investmentId: investment.id,
        transactionType: TransactionType.CREDIT,
        amount: dailyEarning,
        status: TransactionStatus.SUCCESSFUL,
        date: new Date()
      }
    });

    // Update the ledger
    const today = new Date();
    const investmentLedgerEntry = await prisma.investmentLedger.findFirst({
      where: {
        investmentId: investment.id,
        dueDate: {
          equals: today
        }
      }
    });

    if (investmentLedgerEntry) {
      await prisma.investmentLedger.update({
        where: { id: investmentLedgerEntry.id },
        data: {
          status: 'COMPLETE',
          paid: dailyEarning
        }
      });
    }
  }
  console.log('Daily earnings updated successfully');
};

// Run the function immediately for testing purposes
updateDailyEarnings().then(() => console.log('Daily earnings updated for testing.'));

/**
 * Query for users
 * @param {Object} filter - Prisma filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

export const queryInvestments = async <Key extends keyof Investment>(
  filter: object,
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  },
  keys: Key[] = ['id', 'amount', 'balance', 'expectedReturn', 'startDate', 'userId'] as Key[]
): Promise<Pick<Investment, Key>[]> => {
  const { limit = 10, page = 1, sortBy, sortType = 'desc' } = options;

  try {
    const investments = await prisma.investment.findMany({
      where: filter,
      include: {
        investmentPlan: {
          select: { name: true, amount: true }
        }
      },
      // select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
      skip: (page - 1) * limit,
      take: limit,
      orderBy: sortBy ? { [sortBy]: sortType } : undefined
    });
    return investments as Pick<Investment, Key>[];
  } catch (error) {
    console.error('Error querying investments:', error);
    throw new Error('Failed to query investments');
  }
};

/**
 * Query for users
 * @param {Object} investment - Investment
 * @param {Object} investmentPlan - InvestmentPlan
 * @returns {Promise<void>}
 */
const generateLedgerEntries = (
  investment: Investment,
  investmentPlan: Pick<InvestmentPlan, 'dailyInterest' | 'durationDays'>
) => {
  const { userId, id: investmentId, amount, startDate } = investment;
  const { dailyInterest, durationDays } = investmentPlan;

  const ledgerEntries = [];
  for (let day = 0; day < durationDays; day++) {
    const dueDate = new Date(startDate);
    dueDate.setDate(dueDate.getDate() + day);

    const receivable = amount * (dailyInterest / 100);

    ledgerEntries.push({
      userId,
      investmentId,
      dueDate,
      status: 'INCOMPLETE',
      receivable,
      paid: 0
    });
  }

  return ledgerEntries;
};

/**
 * get investment ledger based on userId and inc
 * @param {number} userId
 * @param {number} investmentId
 * @returns {Promise<InvestmentLedger[]>}
 */

interface ExtendedInvestmentLedger {
  id: number;
  userId: number;
  investmentId: number;
  dueDate: Date;
  status: string;
  receivable: number;
  paid: number;
  principal: number; // Principal amount
  interest: number; // Interest amount
  earningDate: Date; // Earning date (same as dueDate)
  createdAt: Date;
  updatedAt: Date;
}
const getLedgerEntriesByUserAndInvestmentPlan = async (
  userId: number,
  investmentId: number
): Promise<ExtendedInvestmentLedger[]> => {
  const investmentLedgerEntries = await prisma.investmentLedger.findMany({
    where: {
      userId,
      investmentId
    },
    include: { investment: true }
  });

  return investmentLedgerEntries.map((entry) => ({
    id: entry.id,
    userId: entry.userId,
    investmentId: entry.investmentId,
    dueDate: entry.dueDate,
    status: entry.status,
    receivable: entry.receivable,
    paid: entry.paid,
    principal: entry.investment.amount,
    interest: entry.receivable, // Assuming receivable is the interest for that day
    earningDate: entry.dueDate,
    createdAt: entry.createdAt,
    updatedAt: entry.updatedAt
  }));
};

export default {
  createInvestment,
  updateDailyEarnings,
  queryInvestments,
  generateLedgerEntries,
  getLedgerEntriesByUserAndInvestmentPlan
};
