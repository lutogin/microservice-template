import db from 'db';
import addressEmployerSchema from './address-employer-schema';
import CONNECTORS_MODEL_NAMES from '../connectors-model-names';

db.use(CONNECTORS_MODEL_NAMES.ADDRESS_EMPLOYER, addressEmployerSchema);

export default db.models[CONNECTORS_MODEL_NAMES.ADDRESS_EMPLOYER];
