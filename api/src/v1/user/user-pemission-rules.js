import { methods } from './user-controller';
import permissions from '../common/constants/permissions';

const permissionRules = {
  [methods.readCurrent]: [permissions.USER, permissions.ADMIN, permissions.SUPER_ADMIN],
  [methods.updateCurrent]: [permissions.USER, permissions.ADMIN, permissions.SUPER_ADMIN],
  [methods.read]: [permissions.ADMIN, permissions.SUPER_ADMIN],
  [methods.readById]: [permissions.ADMIN, permissions.SUPER_ADMIN],
};

export default permissionRules;
