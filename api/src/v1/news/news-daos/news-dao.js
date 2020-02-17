import BaseDao from '../../../lib/base-dao-sequelize';
import News from '../news-model';

class NewsDao extends BaseDao {}

export default new NewsDao(News);
