module.exports = {
  routes: [
    {
      // Path defined with a URL parameter
      method: 'GET',
      path: '/bookings/by-subgroup/:id ',
      handler: 'custom-booking.getBookingsBySubgroup',
      config: {
        middlewares: [
          {
            name: 'api::booking.check-id',
            config: {
              path: 'params',
            },
          },
        ],
      },
    },
  ],
};
