'use strict';

module.exports = {
  get bookingsService() {
    return strapi.service('api::booking.booking');
  },
  get bookignsController() {
    return strapi.controller('api::booking.booking');
  },

  async getBookingsBySubgroup(ctx) {
    const { id: subgroupId } = ctx.params;
    const bookings = await this.bookingsService.getBookingsBySubgroup(
      subgroupId,
    );
    ctx.body = { bookings };
  },
};
