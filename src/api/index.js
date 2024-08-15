import express from 'express';
import SongRouter from './song/song.router.js';
import AuthRouter from './auth/auth.router.js';
import UserRouter from './user/user.router.js';

export const restRouter = express.Router();
restRouter.use('/auth', AuthRouter);
restRouter.use('/songs', SongRouter);
restRouter.use('/users', UserRouter);
