'use strict';

/**
 * booking service.
 */

const { createCoreService } = require('@strapi/strapi').factories;
const API_BOOKING_STR = 'api::booking.booking';

module.exports = createCoreService(API_BOOKING_STR, () => ({
  async getBookingsBySubgroup(subgroupId) {
    const nowStr = new Date().toJSON();
    let bookings = await strapi.entityService.findMany(API_BOOKING_STR, {
      filters: {
        subgroup: subgroupId,
        end: {
          $gte: nowStr,
        },
      },
      populate: ['equipment'],
      sort: { begin: 'ASC' },
    });
    return bookings;
  },
}));
