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
  async getBookingByIdForUser(bookingId, userId) {
    let bookings = await strapi.entityService.findMany(API_BOOKING_STR, {
      filters: {
        id: bookingId,
        subgroup: {
          users: userId,
        },
      },
      populate: ['equipment'],
      sort: { begin: 'ASC' },
    });
    if (bookings.length === 0) {
      throw new DetailedError(
        'Пользователь не состоит в группе c этой бронью или такой брони не существует',
        {
          bookings: JSON.stringify(bookings),
          bookingId,
        },
      );
    }
    return bookings[0];
  },
}));
