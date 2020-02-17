import { compose } from 'ramda';
import permissionValidation from '../../lib/routes/decorators/permission-validation-decorator';
import permissionRules from './user-pemission-rules';
import UserController from './user-controller';

const EnhancedUserController = compose(permissionValidation(permissionRules))(
  UserController,
);

export { methods } from './user-controller';
export default new EnhancedUserController();
