import MainApiService from '../common/api/main-api-service';
import PERMISSIONS from '../common/constants/permissions';

const userEndpoints = {
  users: () => '/v1/users',
  userByID: id => `/v1/users/${id}`,
};

class AdminApiService extends MainApiService {
  getAllAdminUsers = ({ user, data }) =>
    this.makeRequest(
      this.METHODS.GET,
      userEndpoints.users(),
      {
        params: {
          role: [PERMISSIONS.SUPER_ADMIN, PERMISSIONS.ADMIN],
          ...data,
        },
      },
      user,
    );

  getUserById = ({ user, data: { id } }) =>
    this.makeRequest(this.METHODS.GET, userEndpoints.userByID(id), null, user);

  updateUserById = ({ user, data: { id, ...data } }) =>
    this.makeRequest(
      this.METHODS.PUT,
      userEndpoints.userByID(id),
      { data },
      user,
    );

  createUser = ({ user, data }) =>
    this.makeRequest(
      this.METHODS.POST,
      userEndpoints.users(),
      { data: { role: PERMISSIONS.ADMIN, ...data } },
      user,
    );

  deleteUserById = ({ user, data: { id } }) =>
    this.makeRequest(
      this.METHODS.DELETE,
      userEndpoints.userByID(id),
      null,
      user,
    );

  activateUserAccountById = ({ user, data: { id } }) =>
    this.makeRequest(
      this.METHODS.PUT,
      userEndpoints.userByID(id),
      { data: { accountStatus: 1 } },
      user,
    );

  deactivateUserAccountById = ({ user, data: { id } }) =>
    this.makeRequest(
      this.METHODS.PUT,
      userEndpoints.userByID(id),
      { data: { accountStatus: 2 } },
      user,
    );

  makeAdminById = ({ user, data: { id } }) =>
    this.makeRequest(
      this.METHODS.PUT,
      userEndpoints.userByID(id),
      { data: { role: PERMISSIONS.ADMIN } },
      user,
    );

  makeSuperAdminById = ({ user, data: { id } }) =>
    this.makeRequest(
      this.METHODS.PUT,
      userEndpoints.userByID(id),
      { data: { role: PERMISSIONS.SUPER_ADMIN } },
      user,
    );
}

export default new AdminApiService();
