import db from 'db';
import localeSchema from './locale-schema';

const modleName = 'locale';

db.use(modleName, localeSchema);

export default db.models[modleName];
