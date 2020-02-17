import { PermissionsError } from '../errors';
import ACCOUNT_STATUSES from '../../v1/user/user-constants/user-account-statuses';

function permissionsValidator(methodPermission, request) {
  const { user } = request;

  if (!methodPermission) {
    // Public route, no validation needed
    return;
  }

  const permissions = methodPermission instanceof Array ? methodPermission : [methodPermission];

  for (const permission of permissions) {
    if (user && permission === user.role && user.accountStatus !== ACCOUNT_STATUSES.DISABLED) {
      // Private and user gave valid token
      return;
    }
  }

  // Unauthorised
  throw new PermissionsError();
}

export default permissionsValidator;
