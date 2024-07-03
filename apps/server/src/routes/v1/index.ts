import express from 'express';
import config from '../../config/config';
import authRoute from './auth.route';
import docsRoute from './docs.route';

import userRoute from './user.route';
import workspaceRoute from './workspace.route';
import issueRoute from './issue.route';
import projectRoute from './project.route';
import webhookRoute from './webhook.route';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute
  },
  {
    path: '/users',
    route: userRoute
  },
  {
    path: '/api',
    route: webhookRoute
  },
  {
    path: '/workspace',
    route: workspaceRoute
  },
  {
    path: '/issue',
    route: issueRoute
  },
  {
    path: '/project',
    route: projectRoute
  }
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
