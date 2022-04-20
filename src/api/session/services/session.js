'use strict';

/**
 * session service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::session.session', ({ strapi }) => ({
    // Method 1: Creating an entirely custom service
    async isSessionInProgress(session) {
        const now = new Date();
        if (new Date(session.end) > now && now > new Date(session.begin)) {
            return true;
        }
        return false;
    },

    // // Method 2: Wrapping a core service (leaves core logic in place)
    // async find(...args) {
    //     // Calling the default core controller
    //     const { results, pagination } = await super.find(...args);

    //     // some custom logic
    //     results.forEach(result => {
    //         result.counter = 1;
    //     });

    //     return { results, pagination };
    // },

    // // Method 3: Replacing a core service
    // async findOne(entityId, params = {}) {
    //     return strapi.entityService.findOne('api::restaurant.restaurant', entityId, this.getFetchParams(params));
    // }
}));
