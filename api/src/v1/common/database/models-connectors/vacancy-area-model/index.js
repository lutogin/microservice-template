import db from 'db';
import vacancyAreaSchema from './vacancy-area-schema';
import CONNECTORS_MODEL_NAMES from '../connectors-model-names';

db.use(CONNECTORS_MODEL_NAMES.VACANCY_AREA, vacancyAreaSchema);

export default db.models[CONNECTORS_MODEL_NAMES.VACANCY_AREA];
