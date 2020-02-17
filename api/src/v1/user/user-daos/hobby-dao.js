import BaseDao from '../../../lib/base-dao-sequelize';
import Hobby from '../user-model/user-dependent-models/hobby-model';

class HobbyDao extends BaseDao {
  // eslint-disable-next-line class-methods-use-this
  async updateById(userId, newHobbies, options) {
    return this.transaction(async transaction => {
      const commonOptions = { transaction, ...options };

      await this.delete({ user_id: userId }, commonOptions);
      for (const title of newHobbies) {
        await this.create({ title, user_id: userId }, commonOptions);
      }
    });
  }
}

export default new HobbyDao(Hobby);
