import Joi from 'joi';

const createUserSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  nationalId: Joi.string().required(),
  phone: Joi.string().required(),
  password: Joi.string().required(),
});

const updateUserSchema = Joi.object().keys({
  firstName: Joi.string(),
  lastName: Joi.string(),
  nationalId: Joi.string(),
  phone: Joi.string(),
  password: Joi.string(),
});

export { createUserSchema, updateUserSchema };
