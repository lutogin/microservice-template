import { omit } from 'ramda';
import BaseDao from '../../../lib/base-dao-sequelize';
import Auth from '../user-model/user-dependent-models/auth-model';
import passwordUtil from '../user-helpers/user-password-helper';

class AuthDao extends BaseDao {
  create(fields, options) {
    const passwordHash = passwordUtil.generateHash(fields.password);
    return super.create({ ...fields, passwordHash }, options);
  }

  async updateById(userId, fields) {
    const data = omit(['password'], fields);
    if (fields.password) {
      data.passwordHash = passwordUtil.generateHash(fields.password);
    }
    const auth = await super.getOne({ userId });
    return auth ? super.update({ userId }, data) : super.create({ userId, ...data });
  }
}

export default new AuthDao(Auth);
