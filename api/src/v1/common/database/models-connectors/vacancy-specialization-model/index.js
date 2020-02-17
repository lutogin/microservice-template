import db from 'db';
import vacancySpecializationSchema from './vacancy-specialization-schema';
import CONNECTORS_MODEL_NAMES from '../connectors-model-names';

db.use(CONNECTORS_MODEL_NAMES.VACANCY_SPECIALIZATION, vacancySpecializationSchema);

export default db.models[CONNECTORS_MODEL_NAMES.VACANCY_SPECIALIZATION];
