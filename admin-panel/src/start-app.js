import http from 'http';
import logger from '@logger';
import { port } from './config';
import app from './app';

async function startApp() {
  const server = http.createServer(app);

  server.listen(port);
  logger.info(`App listening on port ${port}`);

  return server;
}

export default startApp;
