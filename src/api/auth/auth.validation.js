import Joi from 'joi';

const signupSchema = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  nationalId: Joi.string().required(),
  phone: Joi.string().required(),
  password: Joi.string().required(),
});

const loginPasswordSchema = Joi.object().keys({
  phone: Joi.string().required(),
  password: Joi.string().required(),
});

const otpSchema = Joi.object().keys({
  nationalId: Joi.string().required(),
  phone: Joi.string().required(),
});

const loginOtpSchema = Joi.object().keys({
  nationalId: Joi.string().required(),
  phone: Joi.string().required(),
  otp: Joi.number().required(),
});

export { signupSchema, loginOtpSchema, otpSchema, loginPasswordSchema };
