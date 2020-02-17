import BaseDao from '../../../../lib/base-dao-sequelize';
import { VacancyDrivingLicenseCategory } from '../models-connectors';
import daoMethodReplace from '../helpers/dao-method-replace';

class VacancyDrivingLicenseCategoryDao extends BaseDao {
  async replace(vacancyId, drivingLicenseCategoryIds, options) {
    return this.transaction(async transaction => {
      const commonOptions = { transaction, ...options };
      const names = { source: 'vacancyId', target: 'drivingLicenseCategoryId' };
      return daoMethodReplace(this, vacancyId, drivingLicenseCategoryIds, names, commonOptions);
    });
  }
}

export default new VacancyDrivingLicenseCategoryDao(VacancyDrivingLicenseCategory);
