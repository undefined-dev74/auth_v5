import Joi from 'joi';

const createInvestmentPlan = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    amount: Joi.number().integer(),
    dailyInterest: Joi.number().required(),
    description: Joi.string(),
    returnPercentage: Joi.number(),
    durationDays: Joi.number().integer().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required()
  })
};

const getInvestmentPlans = {
  query: Joi.object().keys({
    id: Joi.number().positive(),
    name: Joi.string(),
    amount: Joi.number(),
    dailyInterest: Joi.number(),
    returnPercentage: Joi.number(),
    status: Joi.string().valid('PENDING', 'ACTIVE', 'COMPLETED'),
    startDate: Joi.date(),
    endDate: Joi.date(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
    minAmount: Joi.number(),
    maxAmount: Joi.number(),
    minReturnPercentage: Joi.number(),
    maxReturnPercentage: Joi.number(),
    minDailyInterest: Joi.number(),
    maxDailyInterest: Joi.number(),
    minDurationDays: Joi.number(),
    maxDurationDays: Joi.number(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getInvestmentPlan = {
  params: Joi.object().keys({
    investmentPlanId: Joi.number().integer()
  })
};

const updateInvestmentPlan = {
  params: Joi.object().keys({
    investmentPlanId: Joi.number().integer()
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      dailyInterest: Joi.number(),
      returnPercentage: Joi.number()
    })
    .min(1)
};

const deleteInvestment = {
  params: Joi.object().keys({
    investmentPlanId: Joi.number().integer()
  })
};

export default {
  createInvestmentPlan,
  getInvestmentPlans,
  getInvestmentPlan,
  updateInvestmentPlan,
  deleteInvestment
};
