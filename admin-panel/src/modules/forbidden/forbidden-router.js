import forbiddenController from './forbidden-controller';
import { Route, addRoutes } from '../../lib/routes';

const router = addRoutes(forbiddenController)([
  Route.get('/', forbiddenController.renderForbiddenPage),
]);

export default router;
