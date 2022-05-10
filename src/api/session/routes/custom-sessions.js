module.exports = {
  routes: [
    {
      // Path defined with a URL parameter
      method: 'GET',
      path: '/sessions/:id/canConnect',
      handler: 'custom-sessions.canConnect',
      config: {},
    },
    {
      // Path defined with a URL parameter
      method: 'GET',
      path: '/sessions/my-sessions',
      handler: 'custom-sessions.getSessionsByCurrentUser',
      config: {},
    },
    {
      // Path defined with a URL parameter
      method: 'GET',
      path: '/sessions/nearest-and-started',
      handler: 'custom-sessions.getStartedAndNearestSessions',
      config: {},
    },
    ,
    {
      // Path defined with a URL parameter
      method: 'GET',
      path: '/sessions/equipment/:equipmentId/begin-date/:begin/end-date/:end',
      handler: 'custom-sessions.getSessionsByEquipmentInRangeDate',
      config: {
        middlewares: [
          {
            name: 'api::session.check-range-date',
            config: {
              path: 'params',
            },
          },
        ],
      },
    },
  ],
};
