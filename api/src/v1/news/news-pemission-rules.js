import { methods } from './news-controller';
import permissions from '../common/constants/permissions';

const permissionRules = {
  [methods.create]: [permissions.ADMIN, permissions.SUPER_ADMIN],
  [methods.read]: [permissions.USER, permissions.ADMIN, permissions.SUPER_ADMIN],
  [methods.readById]: [permissions.USER, permissions.ADMIN, permissions.SUPER_ADMIN],
};

export default permissionRules;
