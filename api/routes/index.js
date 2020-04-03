const Router = [
  {
    path: '/',
    handler: require('./RootRoutes'),
  },
  {
    path: '/users',
    handler: require('./UserRoutes'),
  },
  {
    path: '/images',
    handler: require('./ImageRoutes'),
  },
  {
    path: '/tasks',
    handler: require('./TaskRoutes'),
  },
  {
    path: '/roles',
    handler: require('./RoleRoutes'),
  },
  {
    path: '/status',
    handler: require('./StatusRoutes'),
  },
  {
    path: '/ratings',
    handler: require('./RatingRoutes'),
  },
];

export default Router;