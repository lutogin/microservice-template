import HTTP_STATUS_CODE from 'http-status-codes';

class RequestValidationError extends Error {
  name = 'RequestValidationError';

  status = HTTP_STATUS_CODE.BAD_REQUEST;

  message = 'Invalid input data, please check it.';

  constructor(message, payload) {
    super(message);
    this.message = message || this.message;
    this.payload = payload;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default RequestValidationError;
