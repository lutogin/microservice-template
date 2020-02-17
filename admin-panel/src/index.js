import logger from '@logger';
import './config';

import startApp from './start-app';

startApp().catch(err => {
  logger.error(err);
  process.kill(1);
});
