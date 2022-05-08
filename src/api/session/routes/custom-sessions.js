module.exports = {
    routes: [
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/sessions/:id/canConnect',
        handler: 'custom-sessions.canConnect',
        config: {}
      },
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/sessions/my-sessions',
        handler: 'custom-sessions.getSessionsByCurrentUser',
        config: {}
      },
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/sessions/nearest-and-started',
        handler: 'custom-sessions.getStartedAndNearestSessions',
        config: {}
      },
      ,
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/sessions/equipment/:equipmentId/start-date/:startDate/end-date/:endDate',
        handler: 'custom-sessions.getSessionsByDateAndEquipment',
        config: {
          middlewares: [
            'api::session.check-range-date'
          ]
        }
      },
    ]
  }