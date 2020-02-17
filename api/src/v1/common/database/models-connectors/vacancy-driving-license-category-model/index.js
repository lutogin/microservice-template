import db from 'db';
import vacancyDrivingLicenseCategorySchema from './vacancy-driving-license-category-area-schema';
import CONNECTORS_MODEL_NAMES from '../connectors-model-names';

db.use(
  CONNECTORS_MODEL_NAMES.VACANCY_DRIVING_LICENSE_CATEGORY,
  vacancyDrivingLicenseCategorySchema,
);

export default db.models[CONNECTORS_MODEL_NAMES.VACANCY_DRIVING_LICENSE_CATEGORY];
