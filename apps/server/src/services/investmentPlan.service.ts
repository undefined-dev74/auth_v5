import { InvestmentPlan, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import prisma from '../client';
import ApiError from '../utils/ApiError';

/**
 * Create a investment
 * @param {Object} payload
 * @returns {Promise<InvestmentPlan>}
 */
const createInvestmentPlan = async (payload: InvestmentPlan): Promise<InvestmentPlan> => {
  // Check if an investment plan with the same name, startDate, and durationDays already exists
  const existingInvestmentPlan = await prisma.investmentPlan.findFirst({
    where: {
      name: payload.name,
      startDate: new Date(payload.startDate),
      durationDays: payload.durationDays
    }
  });

  if (existingInvestmentPlan) {
    // If a duplicate is found, return an error response
    throw new ApiError(httpStatus.BAD_REQUEST, 'Investment plan already exists.');
  }

  return prisma.investmentPlan.create({
    data: {
      ...payload,
      returnPercentage: payload.dailyInterest * payload.durationDays
    }
  });
};

/**
 * Query for investments
 * @param {Object} filter - Prisma filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryInvestments = async <Key extends keyof InvestmentPlan>(
  filter: Record<string, any>,
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  },
  keys: Key[] = [
    'id',
    'name',
    'amount',
    'durationDays',
    'returnPercentage',
    'status',
    'startDate',
    'endDate',
    'dailyInterest',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<InvestmentPlan, Key>[]> => {
  const { limit = 10, page = 1, sortBy, sortType = 'desc' } = options;
  const where: any = {};
  if (filter.name) where.name = { contains: filter.name };
  if (filter.amount) where.amount = filter.amount;
  if (filter.returnPercentage) where.returnPercentage = filter.returnPercentage;
  if (filter.dailyInterest) where.dailyInterest = filter.dailyInterest;
  if (filter.status) where.status = filter.status;
  if (filter.startDate) where.startDate = { gte: new Date(filter.startDate) };
  if (filter.endDate) where.endDate = { lte: new Date(filter.endDate) };
  if (filter.createdAt) where.createdAt = { gte: new Date(filter.createdAt) };
  if (filter.updatedAt) where.updatedAt = { lte: new Date(filter.updatedAt) };

  if (filter.minAmount) where.amount = { ...where.amount, gte: filter.minAmount };
  if (filter.maxAmount) where.amount = { ...where.amount, lte: filter.maxAmount };
  if (filter.minReturnPercentage)
    where.returnPercentage = { ...where.returnPercentage, gte: filter.minReturnPercentage };
  if (filter.maxReturnPercentage)
    where.returnPercentage = { ...where.returnPercentage, lte: filter.maxReturnPercentage };
  if (filter.minDailyInterest)
    where.dailyInterest = { ...where.dailyInterest, gte: filter.minDailyInterest };
  if (filter.maxDailyInterest)
    where.dailyInterest = { ...where.dailyInterest, lte: filter.maxDailyInterest };
  if (filter.minDurationDays)
    where.durationDays = { ...where.durationDays, gte: filter.minDurationDays };
  if (filter.maxDurationDays)
    where.durationDays = { ...where.durationDays, lte: filter.maxDurationDays };

  try {
    const investments = await prisma.investmentPlan.findMany({
      where,
      select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
      skip: (page - 1) * limit,
      take: limit,
      orderBy: sortBy ? { [sortBy]: sortType } : undefined
    });

    return investments as Pick<InvestmentPlan, Key>[];
  } catch (error) {
    console.error('Error querying investments:', error);
    throw new Error('Failed to query investments');
  }
};

/**
 * Get investmentPlan by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<InvestmentPlan, Key> | null>}
 */
const getInvestmentPlanById = async <Key extends keyof InvestmentPlan>(
  id: number,
  keys: Key[] = [
    'id',
    'name',
    'amount',
    'durationDays',
    'returnPercentage',
    'status',
    'startDate',
    'endDate',
    'dailyInterest',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<InvestmentPlan, Key> | null> => {
  return prisma.investmentPlan.findUnique({
    where: { id },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<InvestmentPlan, Key> | null>;
};

/**
 * Get investmentPlan by name
 * @param {string} name
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<InvestmentPlan, Key> | null>}
 */
const getInvestmentPlanByName = async <Key extends keyof InvestmentPlan>(
  name: string,
  keys: Key[] = [
    'id',
    'name',
    'amount',
    'durationDays',
    'returnPercentage',
    'status',
    'startDate',
    'endDate',
    'dailyInterest',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<InvestmentPlan, Key> | null> => {
  return prisma.investmentPlan.findFirst({
    where: { name },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<InvestmentPlan, Key> | null>;
};

/**
 * Update investmentPlan by id
 * @param {ObjectId} investmentPlanId
 * @param {Object} updateBody
 * @returns {Promise<InvestmentPlan>}
 */
const updateInvestmentPlanById = async <Key extends keyof InvestmentPlan>(
  investmentPlanId: number,
  updateBody: Prisma.InvestmentPlanUpdateInput,
  keys: Key[] = [
    'id',
    'name',
    'amount',
    'durationDays',
    'returnPercentage',
    'status',
    'startDate',
    'endDate',
    'dailyInterest',
    'createdAt',
    'updatedAt'
  ] as Key[]
): Promise<Pick<InvestmentPlan, Key> | null> => {
  // Retrieve the existing investment plan by ID
  const investmentPlan = await getInvestmentPlanById(investmentPlanId, ['id', 'name']);
  if (!investmentPlan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Investment Plan not found');
  }

  // Check if the name in the update body is already taken
  if (updateBody.name && (await getInvestmentPlanByName(updateBody.name as string))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }

  // Update the investment plan
  const updatedInvestmentPlan = await prisma.investmentPlan.update({
    where: { id: investmentPlan.id },
    data: updateBody,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  });

  return updatedInvestmentPlan as Pick<InvestmentPlan, Key> | null;
};

/**
 * Delete investment by id
 * @param {ObjectId} investmentPlanId
 * @returns {Promise<investment>}
 */
const deleteInvestmentPlanById = async (investmentPlanId: number): Promise<InvestmentPlan> => {
  const investmentPlan = await getInvestmentPlanById(investmentPlanId);
  if (!investmentPlan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'investment not found');
  }
  await prisma.investmentPlan.delete({ where: { id: investmentPlan.id } });
  return investmentPlan;
};

export default {
  createInvestmentPlan,
  queryInvestments,
  getInvestmentPlanById,
  updateInvestmentPlanById,
  getInvestmentPlanByName,
  deleteInvestmentPlanById
};
