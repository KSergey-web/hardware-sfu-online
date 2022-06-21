'use strict';

/**
 *  session controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const DetailedError = require('../../../custom-code/detailed-error.class');
const Serializer = require('../../../custom-code/serializer.class');

module.exports = createCoreController('api::session.session', ({ strapi }) => ({
  get sessionService() {
    return strapi.service('api::session.session');
  },

  async create(ctx) {
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
  async find(ctx) {
    const { serialize } = ctx.query;
    const res = await super.find(ctx);
    if (serialize) {
      res.data = Serializer.serializeArray(res.data);
    }
    return res;
  },
  async findOne(ctx) {
    const { serialize } = ctx.query;
    const res = await super.findOne(ctx);
    if (serialize && res) {
      res.data = Serializer.serializeObject(res.data);
    }
    return res;
  },
}));
