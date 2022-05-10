'use strict';

/**
 *  session controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const DetailedError = require('../../../custom-code/detailed-error.class');

module.exports = createCoreController('api::session.session', ({ strapi }) => ({
  get sessionService() {
    return strapi.service('api::session.session');
  },

  async create(ctx) {
    const { equipment, begin, end } = ctx.request.body.data;
    try {
      ctx.body = await super.create(ctx);
    } catch (err) {
      if (err instanceof DetailedError) {
        return ctx.badRequest(err.message, err.details);
      } else {
        throw err;
      }
    }
  },
}));
