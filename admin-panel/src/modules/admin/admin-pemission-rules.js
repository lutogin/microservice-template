import { methods } from './admin-controller';
import permissions from '../common/constants/permissions';

const permissionRules = {
  [methods.renderAdminsPage]: [permissions.ADMIN, permissions.SUPER_ADMIN],
  [methods.renderAdminPage]: [permissions.ADMIN, permissions.SUPER_ADMIN],
};

export default permissionRules;
