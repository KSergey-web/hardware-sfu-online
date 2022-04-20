'use strict';

const { TEACHER } = require('../../../constants');

module.exports = {
    async canConnect(ctx) {
        try {
            const sessionId = ctx.params.id;
            const user = ctx.state.user;
            console.log('happy');
            const session = await strapi
                .query("api::session.session")
                .findOne({
                    where: { id: sessionId },
                    populate: {
                        user: true,
                        equipment: true
                    }
                })
            if (!session) throw new Error('Session not found');
            if (session.user.id !== user.id || user.role.type !== TEACHER) throw new Error('You have no access to this session');
            //const wrapSession = await strapi.controller('api::session.session').findOne(ctx);
            const isSessionInProgress = await strapi.service('api::session.session').isSessionInProgress(session);
            if (!isSessionInProgress)
                       throw new Error('Session is not in progress status');
            ctx.body = { equipment: session.equipment }
        } catch (err) {
            return ctx.badRequest(err.message, err)
        }
    },
};