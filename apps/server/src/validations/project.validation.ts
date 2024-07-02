import Joi from 'joi';

const createProjectSchema = Joi.object({
  params: Joi.object({
    workspaceId: Joi.number().integer().positive().required()
  }),
  body: Joi.object({
    title: Joi.string().required().max(255),
    key: Joi.string().max(50),
    description: Joi.string().allow('', null),
    scope: Joi.string().valid('public', 'private').default('public')
  })
});

export default { createProjectSchema };
