import adminApi from './admin-api-service';

class UserService {
  constructor() {
    this.api = adminApi;
  }
}

export default new UserService();
