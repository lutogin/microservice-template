import BaseDao from '../../../../lib/base-dao-sequelize';
import { VacancyArea } from '../models-connectors';
import daoMethodReplace from '../helpers/dao-method-replace';

class VacancyAreaDao extends BaseDao {
  async replace(vacancyId, areaIds, options) {
    return this.transaction(async transaction => {
      const commonOptions = { transaction, ...options };
      const names = { source: 'vacancyId', target: 'areaId' };
      return daoMethodReplace(this, vacancyId, areaIds, names, commonOptions);
    });
  }
}

export default new VacancyAreaDao(VacancyArea);
