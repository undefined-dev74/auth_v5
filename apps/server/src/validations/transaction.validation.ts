import Joi from 'joi';

const createTransaction = {
  body: Joi.object().keys({
    investmentId: Joi.number().required(),
    transactionType: Joi.string().valid('DEPOSIT', 'WITHDRAWAL', 'DIVIDEND', 'CREDIT').required(),
    amount: Joi.number().required(),
    status: Joi.string().valid('PENDING', 'SUCCESSFUL', 'FAILED').required(),
    transactionDate: Joi.date().required()
  })
};

const getTransactions = {
  query: Joi.object().keys({
    userId: Joi.number(),
    amount: Joi.number(),
    transactionType: Joi.string().valid('DEPOSIT', 'WITHDRAWAL', 'DIVIDEND', 'CREDIT'),
    status: Joi.string().valid('PENDING', 'SUCCESSFUL', 'FAILED'),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const withdraw = {
  body: Joi.object().keys({
    amount: Joi.number().positive().required(),
    investmentId: Joi.number().positive().required()
  })
};

export default {
  createTransaction,
  getTransactions,
  withdraw
};
