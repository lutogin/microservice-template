import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import * as Sentry from '@sentry/node';
import methodOverride from 'method-override';
import logger from '@logger';
import errorHandler from './error-handler';
import adminPanel from '../modules';
import sendCsvMiddleware from './send-csv';
import templateEngineConfig from './template-engine-config';

import { sentryConfig } from '../config';

function applyMiddleware(app) {
  Sentry.init(sentryConfig);
  app.use(Sentry.Handlers.requestHandler());

  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
  app.use(methodOverride('X-HTTP-Method-Override'));

  app.use((request, response, next) => {
    const render = response.render.bind(response);
    response.render = (path, params) =>
      render(path, { ...params, activeRoute: request.originalUrl });
    next();
  });

  // Config session
  app.use(
    session({
      resave: false, // don't save session if unmodified
      saveUninitialized: false, // don't create session until something stored
      secret: 'super_sercret_ket', // TODO
    }),
  );

  app.use(templateEngineConfig(app));

  app.use(sendCsvMiddleware);

  app.use('/', adminPanel);
  app.use(errorHandler);

  app.use(Sentry.Handlers.errorHandler());

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    res.statusCode = 500;
    res.end(`${res.sentry}\n`);
    logger.error(err);
  });
}

export default applyMiddleware;
