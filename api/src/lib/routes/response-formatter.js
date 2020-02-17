import HTTP_STATUS_CODE from 'http-status-codes';
import RESPONSE_TYPES from '../response-types';
import { InternalServerError } from '../errors';

const defaultFormatter = {
  type: RESPONSE_TYPES.JSON,
  code: HTTP_STATUS_CODE.OK,
  formatter: data => data,
};

function responseFormatter(format, data, request, response) {
  const {
    type = defaultFormatter.type,
    code = defaultFormatter.code,
    formatter = defaultFormatter.formatter,
  } = format || defaultFormatter;

  switch (type) {
    case RESPONSE_TYPES.JSON:
      return response.status(code).json({ data: formatter(data, request) });
    default:
      throw new InternalServerError('Internal Server error occurred. Wrong response format type.');
  }
}

export default responseFormatter;
