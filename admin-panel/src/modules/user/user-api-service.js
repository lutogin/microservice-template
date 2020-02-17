import MainApiService from '../common/api/main-api-service';
import PERMISSIONS from '../common/constants/permissions';

const userEndpoints = {
  login: () => '/v1/users/login',
  getUsers: () => '/v1/users',
  getUserByID: id => `/v1/users/${id}`,
  getCurrentUser: () => '/v1/users/current',
};

class UserApiService extends MainApiService {
  login = ({ data }) =>
    this.makeRequest(this.METHODS.POST, userEndpoints.login(), { data });

  getAllRegularUsers = ({ user, data }) =>
    this.makeRequest(
      this.METHODS.GET,
      userEndpoints.getUsers(),
      {
        params: { role: PERMISSIONS.USER, ...data },
      },
      user,
    );

  getUserById = ({ user, data: id }) =>
    this.makeRequest(
      this.METHODS.GET,
      userEndpoints.getUserByID(id),
      null,
      user,
    );

  getCurrentUser = ({ user }) =>
    this.makeRequest(
      this.METHODS.GET,
      userEndpoints.getCurrentUser(),
      null,
      user,
    );
}

export default new UserApiService();
