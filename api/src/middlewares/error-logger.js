import logger from '../lib/logger';
import * as errors from '../lib/errors';

const checkCustomError = error => Object.keys(errors).indexOf(error.name) !== -1;

const errorLogger = (error, request, response, next) => {
  if (checkCustomError(error)) {
    return next();
  }

  logger.error(error);
  return next();
};

export default errorLogger;
