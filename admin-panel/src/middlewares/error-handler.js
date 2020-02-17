import HTTP_STATUS_CODE from 'http-status-codes';
import logger from '@logger';
import USER_URLS from '../modules/user/user-urls';
import FORBIDDEN_URL from '../modules/forbidden/forbidden-url';

// eslint-disable-next-line no-unused-vars
const getErrorCode = error => error.status || error.code || 500;

const getCommonErrorResponseObject = error => ({
  code: getErrorCode(error),
  name: error.name,
  message: error.message,
  payload: error.payload,
});

const errorSender = (error, request, response, next) => {
  const code = getErrorCode(error);
  if (
    code === HTTP_STATUS_CODE.UNAUTHORIZED &&
    request.originalUrl !== USER_URLS.LOGIN
  ) {
    return response.status(200).redirect(USER_URLS.LOGIN);
  }

  if (
    code === HTTP_STATUS_CODE.FORBIDDEN &&
    request.originalUrl !== FORBIDDEN_URL
  ) {
    return response.status(200).redirect(FORBIDDEN_URL);
  }

  const errorResponseObject = getCommonErrorResponseObject(error);

  response.status(code).json({ error: errorResponseObject });

  logger.error(error);

  return next();
};

export default errorSender;
