import Joi from 'joi';

const newUserRecordSchema = Joi.object().keys({
  title: Joi.string().required(),
  url: Joi.string().required(),
  rating: Joi.number().integer().min(0).max(5).optional(),
});

export default newUserRecordSchema;
