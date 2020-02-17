import { PermissionsError } from '../../errors';

function permissionsValidator(methodPermission, request) {
  const { user } = request;

  if (!methodPermission) {
    // Public route, no validation needed
    return;
  }

  const permissions =
    methodPermission instanceof Array ? methodPermission : [methodPermission];

  for (const permission of permissions) {
    if (user && permission === user.role) {
      // Private and user gave valid token
      return;
    }
  }

  throw new PermissionsError();
}

export default permissionsValidator;
