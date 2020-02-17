import HTTP_STATUS_CODE from 'http-status-codes';
import RESPONSE_TYPES from '../../lib/response-types';
import { methods } from './news-controller';

export default {
  [methods.create]: { type: RESPONSE_TYPES.JSON, code: HTTP_STATUS_CODE.CREATED },
};
