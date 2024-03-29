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
      path: '/sessions/by-current-creator',
      handler: 'custom-sessions.getSessionsByCurrentCreator',
      config: {},
    },
    {
      // Path defined with a URL parameter
      method: 'GET',
      path: '/sessions/nearest-and-started',
      handler: 'custom-sessions.getStartedAndNearestSessions',
      config: {},
    },
    {
      // Path defined with a URL parameter
      method: 'GET',
      path: '/sessions/remainig-sessions', //date=str&booking=id
      handler: 'custom-sessions.getNumberRemainingSessionsInDayForCurrentUser',
      config: {
        middlewares: [
          {
            name: 'api::session.required',
            config: {
              path: 'query',
              params: ['date', 'bookingId'],
            },
          },
        ],
      },
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
    {
      // Path defined with a URL parameter
      method: 'POST',
      path: '/sessions/signup-for-session',
      handler: 'custom-sessions.signupForSession',
      config: {},
    },
  ],
};
