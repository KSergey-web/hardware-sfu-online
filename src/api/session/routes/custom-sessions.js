module.exports = {
    routes: [
      { // Path defined with a URL parameter
        method: 'GET',
        path: '/ses',
        handler: 'custom-sessions.hasAccess',
        config: {

          }
      },
    ]
  }