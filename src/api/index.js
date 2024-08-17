import express from 'express';
import UserRecordRouter from './userRecord/userRecord.router.js';
import AuthRouter from './auth/auth.router.js';
import UserRouter from './user/user.router.js';

export const restRouter = express.Router();
restRouter.use('/auth', AuthRouter);
restRouter.use('/userRecords', UserRecordRouter);
restRouter.use('/users', UserRouter);
