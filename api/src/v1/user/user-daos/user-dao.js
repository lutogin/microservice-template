import BaseDao from '../../../lib/base-dao-sequelize';
import User from '../user-model';
import authDao from './auth-dao';
import hobbyDao from './hobby-dao';

class UserDao extends BaseDao {
  async create(fields, options) {
    const newUser = await this.transaction(async transaction => {
      const commonOptions = { transaction, ...options };
      const { auth: authFields, ...userFields } = fields;

      const user = await super.create(userFields, commonOptions);

      if (authFields) {
        authFields.user_id = user.id;
        await authDao.create(authFields, commonOptions);
      }

      return { ...user };
    });
    return this.getById(newUser.id);
  }

  async emailIsExist(email) {
    return !!(await this.getCount({ email }, { raw: true }));
  }

  async getWithAuth(where, options) {
    const mapedWhere = this.toUnderscoreCase(where);

    return this.getOne(
      null,
      {
        where: mapedWhere,
        include: [
          {
            model: authDao.Model,
          },
        ],
      },
      options,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  async updatePasswordById(id, newPassword) {
    return authDao.updateById(id, newPassword);
  }

  async updateById(id, data, options) {
    await this.transaction(async transaction => {
      const commonOptions = { transaction, ...options };
      const { hobbies, auth, ...userFields } = data;

      const user = await super.updateById(id, userFields, commonOptions);

      if (hobbies) {
        await hobbyDao.updateById(id, hobbies, commonOptions);
      }

      if (auth) {
        await authDao.updateById(id, auth, commonOptions);
      }

      return user;
    });
    return this.getById(id, options);
  }

  async getById(id, options) {
    const user = await this.getOne(
      null,
      {
        where: { id },
        include: [
          {
            model: hobbyDao.Model,
          },
        ],
      },
      options,
    );
    return { ...user, hobbies: user.hobbies.map(hobby => hobby.title) };
  }

  async deleteById(id, options) {
    return super.delete({ id }, options);
  }
}

export default new UserDao(User);
