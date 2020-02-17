import { methods } from './user-controller';
import permissions from '../common/constants/permissions';

const permissionRules = {
  [methods.readCurrent]: [permissions.ADMIN, permissions.SUPER_ADMIN],
  [methods.updateCurrent]: [permissions.ADMIN, permissions.SUPER_ADMIN],
  [methods.renderUsersPage]: [permissions.ADMIN, permissions.SUPER_ADMIN],
};

export default permissionRules;
