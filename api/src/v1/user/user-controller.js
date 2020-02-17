import userService from './user-service';
import jwtService from '../common/services/jwt-service';
import { NotFoundError } from '../../lib/errors';
import userDao from './user-daos/user-dao';

export const methods = {
  registration: 'registration',
  login: 'login',
  updateCurrent: 'updateCurrent',
  readCurrent: 'readCurrent',
  read: 'read',
  readById: 'readById',
  create: 'create',
  createById: 'createById',
  updateById: 'updateById',
  deleteById: 'deleteById',
};

class UserController {
  constructor() {
    this.service = userService;
  }

  async [methods.registration]({ data }) {
    const { email, password } = data;
    const user = await this.service.registerUser(data, { email, password });
    const userWithAuth = await userDao.getWithAuth({ email });
    const token = jwtService.generateJwt(userWithAuth, user.role);

    return { user, token };
  }

  async [methods.login](request, response, next) {
    const userWithAuth = await this.service.authenticateUser('local')(request, response, next);
    const token = jwtService.generateJwt(userWithAuth, userWithAuth.role);
    const user = await userDao.getById(userWithAuth.id);

    return { user, token };
  }

  // eslint-disable-next-line class-methods-use-this
  async [methods.updateCurrent]({ user, data }) {
    const currentUser = await userDao.getById(user.id);
    if (!currentUser) {
      throw new NotFoundError('User not found.');
    }
    return userDao.updateById(user.id, data);
  }

  // eslint-disable-next-line class-methods-use-this
  async [methods.readCurrent]({ user }) {
    const currentUser = await userDao.getById(user.id);
    if (!currentUser) {
      throw new NotFoundError('User not found.');
    }
    return currentUser;
  }

  // eslint-disable-next-line class-methods-use-this
  async [methods.read]({ data }) {
    return userDao.get(data);
  }

  // eslint-disable-next-line class-methods-use-this
  async [methods.readById]({ data }) {
    return userDao.getById(data.id);
  }

  // eslint-disable-next-line class-methods-use-this
  async [methods.create]({ data }) {
    const { password, ...userFields } = data;
    userFields.auth = { password };
    return userDao.create(userFields);
  }

  // eslint-disable-next-line class-methods-use-this
  async [methods.updateById]({ data: { id, ...params } }) {
    const { password, ...userFields } = params;
    userFields.auth = { password };
    return userDao.updateById(id, userFields);
  }

  // eslint-disable-next-line class-methods-use-this
  async [methods.deleteById]({ data: { id } }) {
    return userDao.deleteById(id);
  }
}

export default UserController;
