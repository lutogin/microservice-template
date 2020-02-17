import userApi from './user-api-service';

class UserService {
  constructor() {
    this.api = userApi;
  }

  setAuthCookie(response, token, user) {
    const cookieParams = {
      maxAge: 86400000, // 24 hours
      httpOnly: true,
    };

    response.cookie('access_token', token, cookieParams);
    response.cookie('user_id', user.id, cookieParams);
    return response;
  }
}

export default new UserService();
