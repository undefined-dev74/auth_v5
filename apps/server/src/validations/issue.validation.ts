import Joi from 'joi';

const createIssueSchema = {
  params: Joi.object().keys({
    projectId: Joi.number().integer().positive().required()
  }),
  body: Joi.object().keys({
    title: Joi.string().required().max(255),
    description: Joi.string().allow('', null),
    priority: Joi.string().valid('LOW', 'MEDIUM', 'HIGH', 'URGENT').default('MEDIUM'),
    assigneeId: Joi.number().integer().positive().allow(null),
    reporterId: Joi.number().integer().positive(),
    labels: Joi.array().items(Joi.number().integer().positive())
  })
};

export default { createIssueSchema };
