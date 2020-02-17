import PERMISSIONS from '../../common/constants/permissions';

function getRoleColor(role) {
  switch (role) {
    case PERMISSIONS.USER:
      return 'white';
    case PERMISSIONS.ADMIN:
      return 'blue';
    case PERMISSIONS.SUPER_ADMIN:
      return 'red';

    default:
      return 'white';
  }
}

export default getRoleColor;
