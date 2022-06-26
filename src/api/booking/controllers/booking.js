'use strict';

const Serializer = require('../../../custom-code/serializer.class');

/**
 *  booking controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController(
  'api::booking.booking',
  ({ strapi }) => ({}),
);
