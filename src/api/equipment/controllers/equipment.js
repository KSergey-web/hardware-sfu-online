'use strict';

/**
 *  equipment controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const Serializer = require('../../../custom-code/serializer.class');

module.exports = createCoreController(
  'api::equipment.equipment',
  ({ strapi }) => ({
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
  }),
);
