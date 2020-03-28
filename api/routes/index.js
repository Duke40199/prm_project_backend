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
    path: '/posts',
    handler: require('./PostRoutes'),
  },
  {
    path: '/images',
    handler: require('./ImageRoutes'),
  },
  {
    path: '/ingredients',
    handler: require('./IngredientRoutes'),
  },
  {
    path: '/tasks',
    handler: require('./TaskRoutes'),
  },
  {
    path: '/roles',
    handler: require('./RoleRoutes'),
  },
];

export default Router;