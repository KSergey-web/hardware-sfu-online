module.exports = {
    routes: [
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/sessions/:id/canConnect',
        handler: 'custom-sessions.canConnect',
        config: {

          }
      },
    ]
  }