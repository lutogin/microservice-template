import helpController from './help-controller';
import { Route, addRoutes } from '../../lib/routes';

const router = addRoutes(helpController)([
  Route.get('/', helpController.renderHelpPage),
]);

export default router;
