import db from 'db';
import vacancySkillSchema from './vacancy-skill-schema';
import CONNECTORS_MODEL_NAMES from '../connectors-model-names';

db.use(CONNECTORS_MODEL_NAMES.VACANCY_SKILL, vacancySkillSchema);

export default db.models[CONNECTORS_MODEL_NAMES.VACANCY_SKILL];
