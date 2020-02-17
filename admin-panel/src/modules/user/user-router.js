import userController, { methods } from './user-connector';
import { Route, addRoutes } from '../../lib/routes';

const router = addRoutes(userController)([
  Route.get('/', userController[methods.renderUsersPage]),
  Route.get('/login', userController[methods.renderLoginPage]),
  Route.post('/login', userController[methods.login]),
  Route.get('/logout', userController[methods.logout]),
]);

export default router;
