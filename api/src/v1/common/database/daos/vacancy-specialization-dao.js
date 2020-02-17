import BaseDao from '../../../../lib/base-dao-sequelize';
import { VacancySpecialization } from '../models-connectors';
import daoMethodReplace from '../helpers/dao-method-replace';

class VacancySpecializationDao extends BaseDao {
  async replace(vacancyId, specializationIds, options) {
    return this.transaction(async transaction => {
      const commonOptions = { transaction, ...options };
      const names = { source: 'vacancyId', target: 'specializationId' };
      return daoMethodReplace(this, vacancyId, specializationIds, names, commonOptions);
    });
  }
}

export default new VacancySpecializationDao(VacancySpecialization);
