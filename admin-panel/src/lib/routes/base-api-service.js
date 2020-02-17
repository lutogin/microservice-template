import logger from '@logger';
import axios from 'axios';
import HTTP_METHODS from './constants/http-methods';

class BaseApiService {
  constructor() {
    this.METHODS = HTTP_METHODS;
  }

  getFullUrl = url => `${this.baseUrl}${url}`;

  buildHeaders = (user = {}) => {
    const { accessToken } = user;

    const accessTokenHeader = accessToken ? { access_token: accessToken } : {};

    return accessTokenHeader;
  };

  async makeRequest(method, url, config = {}, user = {}) {
    if (!this.baseUrl) {
      throw new Error('Base url is missing');
    }
    try {
      logger.info(`Request: ${method.toUpperCase()} ${this.getFullUrl(url)}`);
      const result = await axios({
        method,
        url: this.getFullUrl(url),
        headers: this.buildHeaders(user),
        ...config,
      });
      return result.data.data;
    } catch (error) {
      if (error.response && error.response.data) {
        logger.error(error.response.data);
        return error.response.data;
      }
      throw error;
    }
  }
}

export default BaseApiService;
