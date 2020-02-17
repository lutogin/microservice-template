import db from 'db';
import hobbySchema from './hobby-schema';
import USER_MODEL_NAMES from '../../user-model-names';

db.use(USER_MODEL_NAMES.HOBBY, hobbySchema);

export default db.models[USER_MODEL_NAMES.HOBBY];
