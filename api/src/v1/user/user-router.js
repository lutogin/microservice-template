import './user-configs';
import userController, { methods } from './user-connector';
import { Route, addRoutes } from '../../lib/routes';

const router = addRoutes(userController)([
  Route.get('/', userController[methods.read]),
  Route.post('/login', userController[methods.login]),
  Route.post('/registration', userController[methods.registration]),
  Route.get('/current', userController[methods.readCurrent]),
  Route.put('/current', userController[methods.updateCurrent]),

  Route.post('/', userController[methods.create]),
  Route.get('/:id', userController[methods.readById]),
  Route.put('/:id', userController[methods.updateById]),
  Route.delete('/:id', userController[methods.deleteById]),
]);

export default router;
