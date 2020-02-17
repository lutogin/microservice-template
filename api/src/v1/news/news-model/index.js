import db from 'db';
import newsSchema from './news-schema';
import NEWS_MODEL_NAMES from './news-model-names';

const News = db.use(NEWS_MODEL_NAMES.NEWS, newsSchema);

export default News;
