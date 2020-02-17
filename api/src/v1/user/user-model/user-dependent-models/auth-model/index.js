import db from 'db';
import authSchema from './auth-schema';
import USER_MODEL_NAMES from '../../user-model-names';

db.use(USER_MODEL_NAMES.AUTH, authSchema);

export default db.models[USER_MODEL_NAMES.AUTH];
