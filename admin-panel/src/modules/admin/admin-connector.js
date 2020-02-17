import { compose } from 'ramda';
import permissionValidation from '../../lib/routes/decorators/permission-validation-decorator';
import permissionRules from './admin-pemission-rules';
import UserController from './admin-controller';

const EnhancedUserController = compose(permissionValidation(permissionRules))(
  UserController,
);

export { methods } from './admin-controller';
export default new EnhancedUserController();
