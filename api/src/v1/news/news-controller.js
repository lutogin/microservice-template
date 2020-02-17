import newsService from './news-service';
import newsDao from './news-daos/news-dao';

export const methods = {
  create: 'create',
  read: 'read',
  readById: 'readById',
};

class UserController {
  constructor() {
    this.service = newsService;
  }

  // eslint-disable-next-line class-methods-use-this
  async [methods.read]() {
    return newsDao.get();
  }

  // eslint-disable-next-line class-methods-use-this
  async [methods.create]({ data }) {
    return newsDao.create(data);
  }

  // eslint-disable-next-line class-methods-use-this
  async [methods.readById]({ data }) {
    return newsDao.getById(data.id);
  }
}

export default UserController;
