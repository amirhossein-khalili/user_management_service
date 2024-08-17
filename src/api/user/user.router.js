import { Router } from 'express';
import UserController from './user.controller.js';
import UserMiddleware from './user.middleware.js';
import validateSchema from '../../utils/validateSchema.utils.js';
import PermissionMiddleware from '../../middlewares/permission.middleware.js';
import passport from 'passport';
import { createUserSchema, updateUserSchema } from './user.validation.js';

class UserRouter {
  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router
      .route('/')
      .get(
        passport.authenticate('jwt', { session: false }),
        PermissionMiddleware.checkAdminAccess,
        UserController.findAll
      )
      .post(
        passport.authenticate('jwt', { session: false }),
        PermissionMiddleware.checkAdminAccess,
        validateSchema(createUserSchema),
        UserMiddleware.checkUnique,
        UserController.create
      );

    this.router
      .route('/:id')
      .get(
        passport.authenticate('jwt', { session: false }),
        PermissionMiddleware.checkAdminAccess,
        UserController.findOne
      )
      .patch(
        passport.authenticate('jwt', { session: false }),
        PermissionMiddleware.checkAdminAccess,
        validateSchema(updateUserSchema),
        UserController.edit
      )
      .delete(
        passport.authenticate('jwt', { session: false }),
        PermissionMiddleware.checkAdminAccess,
        UserController.destroy
      );
  }
}

export default new UserRouter().router;
