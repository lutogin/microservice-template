import newsController, { methods } from './news-connector';
import { Route, addRoutes } from '../../lib/routes';

const router = addRoutes(newsController)([
  Route.post('/', newsController[methods.create]),
  Route.get('/', newsController[methods.read]),
  Route.get('/:id', newsController[methods.readById]),
]);

export default router;
