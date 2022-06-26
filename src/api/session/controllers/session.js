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
    const superFind = Serializer.serializeDecorator(super.find.bind(this));
    const res = await superFind(ctx);
    return res;
  },
  async findOne(ctx) {
    const superFind = Serializer.serializeDecorator(super.findOne.bind(this));
    const res = await superFind(ctx);
    return res;
  },
}));
