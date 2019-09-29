import { Router } from 'express';
import requireAuthentication from '../middlewares/requireAuthentication';
import UserValidatior from '../validations/UserValidator';
import * as UserController from '../controllers/UserCotroller';
import deletePreviuosSession from '../middlewares/deletePreviuosSession';


export default () => {
  // Protected Routes
  const protectedRouter = Router();
  protectedRouter.use(requireAuthentication());

  protectedRouter.get('/', UserController.index());
  protectedRouter.get('/userInfo', UserController.userInfo());
  protectedRouter.get('/show/:username', UserValidatior.show, UserController.show());
  protectedRouter.post('/logout', UserController.logout());
  protectedRouter.put('/:id', UserValidatior.update, UserController.update());
  // Unprotected Routes
  const openRouter = Router();
  openRouter.post(
    '/register',
    deletePreviuosSession(),
    UserValidatior.register,
    UserController.register()
  );
  openRouter.post(
    '/login',
    deletePreviuosSession(),
    UserValidatior.login,
    UserController.login()
  );

  return [openRouter, protectedRouter];
};
