import { Router } from 'express';
import dispatcher from './dispatcher';

const addRoutes = controller => routes => {
  const router = new Router();

  routes.forEach(routeConfig => {
    const { method, route, controllerMethod } = routeConfig;

    router[method](route, dispatcher(controller, controllerMethod));
  });
  return router;
};

export default addRoutes;
