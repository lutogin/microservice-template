import BaseDao from '../../../../lib/base-dao-sequelize';
import { VacancySkill } from '../models-connectors';
import daoMethodReplace from '../helpers/dao-method-replace';

class VacancySkillDao extends BaseDao {
  async replace(vacancyId, skillIds, options) {
    return this.transaction(async transaction => {
      const commonOptions = { transaction, ...options };
      const names = { source: 'vacancyId', target: 'skillId' };
      return daoMethodReplace(this, vacancyId, skillIds, names, commonOptions);
    });
  }
}

export default new VacancySkillDao(VacancySkill);
