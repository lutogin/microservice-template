import { permissionsValidator, requestValidator, jwtValidator } from '../validators';
import responseFormatter from './response-formatter';
import getRequestData from './get-request-data';
import logger from '../logger';

const dispatcher = (controller, controllerMethod) => async (request, response, next) => {
  try {
    const { permissionRules, validationRules, responseFormats = {} } = controller;

    // Validate JWT and setup user data in user param of request
    request.user = await jwtValidator(request);

    // Do permission validation by rules from permissionRules
    if (permissionRules) {
      await permissionsValidator(permissionRules[controllerMethod.name], request);
    }

    // Get all request data and setup it in data param of request
    request.data = await getRequestData(request);
    logger.info(`Request: ${request.method} ${request.originalUrl};`);
    logger.info(request.data);

    // Do request validation by schemas from validationRules
    if (validationRules) {
      request.data = await requestValidator(validationRules[controllerMethod.name], request);
    }

    const result = await controllerMethod.call(controller, request, response, next);

    return responseFormatter(responseFormats[controllerMethod.name], result, request, response);
  } catch (err) {
    next(err);
    return null;
  }
};

export default dispatcher;
