import HTTP_STATUS_CODE from 'http-status-codes';

class InternalServerError extends Error {
  name = 'InternalServerError';

  status = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR;

  message = 'Internal Server error occurred.';

  constructor(message) {
    super(message);
    this.message = message || this.message;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default InternalServerError;
