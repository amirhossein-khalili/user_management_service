import { Router } from 'express';
import AuthController from './auth.controller.js';
import validateSchema from '../../utils/validateSchema.utils.js';
import { loginOtpSchema, otpSchema } from './auth.validation.js';

class AuthRouter {
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.route('/otp').post(validateSchema(otpSchema), AuthController.getOtp);

    this.router.route('/login').post(validateSchema(loginOtpSchema), AuthController.loginWithOtp);
  }
}

export default new AuthRouter().router;
