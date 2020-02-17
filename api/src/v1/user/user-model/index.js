import db from 'db';
import { Auth, Hobby } from './user-dependent-models';
import userSchema from './user-schema';
import USER_MODEL_NAMES from './user-model-names';
import { HAS_ONE, HAS_MANY } from '../../common/database/association-types';

const User = db.use(USER_MODEL_NAMES.USER, userSchema);

db.makeAssociations([[User, HAS_ONE, Auth, { foreignKey: 'user_id' }]]);
db.makeAssociations([[User, HAS_MANY, Hobby, { foreignKey: 'user_id' }]]);

export default User;
