import userService from './user-service';
import errorHandler from '../common/error-handler';
import URLS from '../common/urls';

export const methods = {
  renderLoginPage: 'renderLoginPage',
  renderUsersPage: 'renderUsersPage',
  logout: 'logout',
  login: 'login',
};

class UserController {
  async [methods.renderUsersPage](request, response) {
    const users = await userService.api.getAllRegularUsers(request);
    response.render('user/views/users', {
      title: 'Users',
      layout: 'main',
      users,
      currentUser: request.user,
    });
  }

  async [methods.renderLoginPage](request, response) {
    const { errorMessage: message } = request.data;
    response.render('user/views/login', {
      title: 'Login',
      layout: 'auth',
      message,
    });
  }

  async [methods.logout](request, response) {
    response.clearCookie('access_token');
    response.clearCookie('user_id');
    return response.redirect(URLS.HOME);
  }

  async [methods.login](request, response) {
    try {
      const { user, token, error } = await userService.api.login(request);
      if (error) {
        request.data.errorMessage = errorHandler.getTextMessage(error);
        return this.renderLoginPage(request, response);
      }
      userService.setAuthCookie(response, token, user);
      return response.redirect(URLS.HOME);
    } catch (error) {
      request.data.errorMessage = error.message;
      return this.renderLoginPage(request, response);
    }
  }
}

export default UserController;
