import passport from 'passport';
import jwtService from '../common/services/jwt-service';
import {
  ResourceDuplicateError,
  AuthorizationError,
  NotFoundError,
  RequestValidationError,
} from '../../lib/errors';
import userPasswordUtil from './user-helpers/user-password-helper';
import userDao from './user-daos/user-dao';

class UserService {
  constructor(jwt) {
    this.jwtService = jwt;
    this.dao = userDao;
  }

  async setNewPassword(passwordData, userData) {
    const user = await this.dao.getWithAuth({ id: userData.id });
    if (!user) {
      throw new NotFoundError('User not found.');
    }

    const { newPassword, oldPassword } = passwordData;

    if (!userPasswordUtil.valid(user, oldPassword)) {
      throw new RequestValidationError('Password is wrong.');
    }

    await this.dao.updatePasswordById(userData.id, newPassword);

    jwtService.invalidateUserTokens(userData);

    return this.dao.getWithAuth({ id: userData.id });
  }

  async checkEmail(email) {
    const existingEmail = await this.dao.emailIsExist(email);
    if (existingEmail) {
      throw new ResourceDuplicateError(
        'email',
        "Can't create a user. A user with this email already exists",
      );
    }
  }

  async registerUser(userData, { email, password }) {
    const userFields = userData;
    userFields.auth = { password };

    await this.checkEmail(email);

    return userDao.create(userFields);
  }

  authenticateUser = method => async (request, response) =>
    new Promise((resolve, reject) => {
      const loginFunction = async (error, user, info) => {
        if (!error && user) {
          return resolve(user);
        }
        return reject(error || new AuthorizationError(info));
      };

      return passport.authenticate(method, loginFunction)(request, response);
    });
}

export default new UserService(jwtService);
