import http from 'http';

import db from 'db';
import { PORT } from './config';
import app from './app';
import logger from './lib/logger';

async function startApp() {
  const server = http.createServer(app);

  server.listen(PORT);
  logger.info(`App listening on port ${PORT}`);

  server.on('close', async () => {
    db.close();
  });

  return server;
}

export default startApp;
