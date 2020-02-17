import USER_ACCOUNT_STATUSES from '../../user/user-constants/user-account-statuses';

function getAccountStatus(status) {
  switch (status) {
    case USER_ACCOUNT_STATUSES.ACTIVE:
      return 'active';

    case USER_ACCOUNT_STATUSES.DISABLED:
      return 'disabled';

    default:
      return 'white';
  }
}

export default getAccountStatus;
