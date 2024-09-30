import { Router } from 'express';
import UserRecordController from './userRecord.controller.js';
// import passport from 'passport';

class UserRecordRouter {
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.route('/').get(
      // passport.authenticate('jwt', { session: false }) ,
      UserRecordController.getRecord
    );
  }
}

export default new UserRecordRouter().router;
