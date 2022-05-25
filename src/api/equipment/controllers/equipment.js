'use strict';

/**
 *  equipment controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const Serializer = require('../../../custom-code/serializer.class');

module.exports = createCoreController('api::equipment.equipment', ({ strapi }) => ({
    async find(ctx) {
        const { serialize } = ctx.query;
        const res = await super.find(ctx);
        if (serialize) {
            res.data = Serializer.serializeArray(res.data);
        }
        return res;
    },
}));
