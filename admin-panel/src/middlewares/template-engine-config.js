import path from 'path';
import express from 'express';
import exphbs from 'express-handlebars';
import handlebarsDateformat from 'handlebars-dateformat';
import handlebarsHelpers from 'handlebars-helpers';

function templateEngineConfig(app) {
  const blocks = [];
  const Handlebars = exphbs.create({
    extname: 'hbs',
    Layout: 'main',
    layoutsDir: 'src/modules/common/views/layouts/',
    partialsDir: 'src/modules/common/views/partials/',
    helpers: {
      url: (routeName, params) => app.locals.url(routeName, params),
      block(name) {
        const val = (blocks[name] || []).join('\n');

        // clear the block
        blocks[name] = [];
        return val;
      },
      extend(name, context) {
        let block = blocks[name];
        if (!block) {
          blocks[name] = [];
          block = blocks[name];
        }

        block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
      },
      isActiveRoute: (routeName, activeRoute) =>
        routeName === activeRoute ? 'active' : '',
      isActiveRoutes: (routeNames, activeRoute) =>
        routeNames.split(',').indexOf(activeRoute) >= 0 ? 'active' : '',
      dateFormat: handlebarsDateformat,
      ...handlebarsHelpers(['array', 'math', 'comparison']),
    },
  });

  app.engine('hbs', Handlebars.engine);
  app.set('views', path.join(__dirname, '../modules/'));
  app.set('view engine', 'hbs');

  return express.static(path.resolve(__dirname, '../public'));
}

export default templateEngineConfig;
