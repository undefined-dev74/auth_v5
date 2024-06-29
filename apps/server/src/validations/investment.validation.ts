import Joi from 'joi';

const createInvestment = {
  body: Joi.object().keys({
    amount: Joi.number().required(),
    investmentPlanId: Joi.number().integer()
  })
};

const getInvestments = {
  query: Joi.object().keys({
    name: Joi.string(),
    amount: Joi.number(),
    balance: Joi.number(),
    expectedReturn: Joi.number(),
    startDate: Joi.date(),
    userId: Joi.number().positive(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getInvestmentLedger = {
  params: Joi.object().keys({
    investmentPlanId: Joi.number().required()
  })
};

export default { createInvestment, getInvestments, getInvestmentLedger };
