'use strict';

/**
 *  subgroup controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const Serializer = require('../../../custom-code/serializer.class');

module.exports = createCoreController(
  'api::subgroup.subgroup',
  ({ strapi }) => ({
    async find(ctx) {
      const { serialize } = ctx.query;
      const res = await super.find(ctx);
      if (serialize) {
        res.subgroups = Serializer.serializeArray(res.data);
      }
      return res;
    },
    async findOne(ctx) {
      const { serialize } = ctx.query;
      const res = await super.findOne(ctx);
      if (serialize && res) {
        res.subgroups = Serializer.serializeObject(res.data);
      }
      return res;
    },
  }),
);
