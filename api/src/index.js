import startApp from './start-app';
import logger from './lib/logger';

startApp().catch(err => {
  logger.error(err);
  process.kill(1);
});

if (process.env.STOP) {
  process.kill(1);
}
