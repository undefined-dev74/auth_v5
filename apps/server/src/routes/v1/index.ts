import express from 'express';
import config from '../../config/config';
import authRoute from './auth.route';
import docsRoute from './docs.route';
import investmentRoute from './investment.route';
import investmentPlanRoute from './investmentPlan.route';
import transactionRoute from './transaction.route';
import userRoute from './user.route';
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
    path: '/investment-plan',
    route: investmentPlanRoute
  },
  {
    path: '/investment',
    route: investmentRoute
  },
  {
    path: '/transaction',
    route: transactionRoute
  },
  {
    path: '/api',
    route: webhookRoute
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
