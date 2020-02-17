import { baseApiUrl } from '../../../config';
import BaseApiSerice from '../../../lib/routes/base-api-service';

class MainApiService extends BaseApiSerice {
  constructor() {
    super();
    this.baseUrl = baseApiUrl;
  }
}

export default MainApiService;
