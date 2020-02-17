import adminController, { methods } from './admin-connector';
import { Route, addRoutes } from '../../lib/routes';

const router = addRoutes(adminController)([
  Route.get('/', adminController[methods.renderAdminsPage]),
  Route.get('/create', adminController[methods.renderCreateAdminPage]),
  Route.post('/create', adminController[methods.createAdmin]),
  Route.get('/:id', adminController[methods.renderAdminPage]),
  Route.post('/:id', adminController[methods.updateAdmin]),
  Route.post('/:id/roles/admin', adminController[methods.changeRoleToAdmin]),
  Route.post(
    '/:id/roles/super-admin',
    adminController[methods.changeRoleToSuperAdmin],
  ),
  Route.post(
    '/:id/account-status/activate',
    adminController[methods.activateAccount],
  ),
  Route.post(
    '/:id/account-status/deactivate',
    adminController[methods.deactivateAccount],
  ),
  Route.post('/:id/delete', adminController[methods.deleteAdmin]),
]);

export default router;
