import BaseDao from '../../../../lib/base-dao-sequelize';
import Locale from '../models/locale';

class LocaleDao extends BaseDao {}

export default new LocaleDao(Locale);
