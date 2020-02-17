import logger from '@logger';
import { requestValidator, permissionsValidator } from './validators';
import getRequestData from './get-request-data';
import getUserData from './get-user-data';

const dispatcher = (controller, controllerMethod) => async (
  request,
  response,
  next,
) => {
  try {
    const { validationRules, permissionRules } = controller;

    // Setup user data in user param of request
    request.user = await getUserData(request);

    // Do permission validation by rules from permissionRules

    if (permissionRules) {
      await permissionsValidator(
        permissionRules[controllerMethod.name],
        request,
      );
    }

    // Get all request data and setup it in data param of request
    request.data = await getRequestData(request);

    if (process.env.NODE_ENV !== 'production') {
      logger.info(`Request: ${request.method} ${request.originalUrl};`);
      logger.info(request.data);
    }

    // Do request validation by schemas from validationRules
    if (validationRules) {
      request.data = await requestValidator(
        validationRules[controllerMethod.name],
        request,
      );
    }
    await controllerMethod.call(controller, request, response, next);
  } catch (err) {
    next(err);
  }
};

export default dispatcher;
