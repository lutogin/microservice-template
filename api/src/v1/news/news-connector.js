import { compose } from 'ramda';
import { permissionValidation, requestValidation, responseFormat } from '../../lib/decorators';
import permissionRules from './news-pemission-rules';
import newsSchema from './news-validation-schema';
import responseFormats from './news-response-formats';
import NewsController from './news-controller';

const EnhancedNewsController = compose(
  permissionValidation(permissionRules),
  requestValidation(newsSchema),
  responseFormat(responseFormats),
)(NewsController);

export { methods } from './news-controller';
export default new EnhancedNewsController();
