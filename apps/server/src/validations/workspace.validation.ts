import Joi from 'joi';

const createWorkspace = {
  body: Joi.object({
    name: Joi.string().required().messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name is required',
      'any.required': 'Name is required'
    }),
    description: Joi.string().required().messages({
      'string.base': 'Description must be a string',
      'string.empty': 'Description is required',
      'any.required': 'Description is required'
    })
  })
};

const getWorkspaces = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getWorkspace = {
  params: Joi.object().keys({
    workspaceId: Joi.number().integer().required()
  })
};

const updateWorkspace = {
  params: Joi.object().keys({
    workspaceId: Joi.number().integer().required()
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      description: Joi.string().allow('')
    })
    .min(1)
};

const deleteWorkspace = {
  params: Joi.object().keys({
    workspaceId: Joi.number().integer().required()
  })
};

export default {
  createWorkspace,
  getWorkspaces,
  getWorkspace,
  updateWorkspace,
  deleteWorkspace
};
