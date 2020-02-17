import USER_ACCOUNT_STATUSES from '../../user/user-constants/user-account-statuses';

function getAccountStatusColor(status) {
  switch (status) {
    case USER_ACCOUNT_STATUSES.ACTIVE:
      return 'green';

    case USER_ACCOUNT_STATUSES.DISABLED:
      return 'white';

    default:
      return 'white';
  }
}

export default getAccountStatusColor;
