import { compose } from 'ramda';
import { permissionValidation, requestValidation, responseFormat } from '../../lib/decorators';
import permissionRules from './user-pemission-rules';
import userSchema from './user-validation-schema';
import responseFormats from './user-response-formats';
import UserController from './user-controller';

const EnhancedUserController = compose(
  permissionValidation(permissionRules),
  requestValidation(userSchema),
  responseFormat(responseFormats),
)(UserController);

export { methods } from './user-controller';
export default new EnhancedUserController();
