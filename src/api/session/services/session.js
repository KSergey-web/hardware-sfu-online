'use strict';

/**
 * session service.
 */
const { sanitizeUser } = require('../../../sanitize-user.function');
const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::session.session', () => ({

    sanitazeUsersPropertiesInSessions(sessions) {
        return sessions = sessions.map(session => {
            session.user = sanitizeUser(session.user);
            session.creator = sanitizeUser(session.creator);
            return session;
        });
    },

    // Method 1: Creating an entirely custom service
    async isSessionInProgress(session) {
        const now = new Date();
        if (new Date(session.end) > now && now > new Date(session.begin)) {
            return true;
        }
        return false;
    },

    async getSessionsByUser(userId) {
        let sessions = await strapi.entityService.findMany('api::session.session', {
            filters: {
                user: userId,
                end: {
                    $gte: new Date().toJSON(),
                }
            },
            populate: ['user', 'creator', 'equipment'],
            sort: { begin: 'ASC' },
        });
        sessions = this.sanitazeUsersPropertiesInSessions(sessions);
        return sessions
    },

    async getStartedAndNearestSessions() {
        const now = new Date().toJSON();
        const tenMinutesInSeconds = 600000;
        const after10Minutes = new Date(+now + tenMinutesInSeconds).toJSON();
        let sessions = await strapi.entityService.findMany('api::session.session', {
            filters: {
                $or: [
                    {
                        begin: {
                            $between: [now, after10Minutes],
                        }
                    },
                    {
                        begin: {
                            $lte: now,
                        }
                    }
                ],
                end: {
                    $gte: now,
                }
            },
            populate: ['user', 'creator', 'equipment'],
            sort: { begin: 'ASC' },
        });
        sessions = this.sanitazeUsersPropertiesInSessions(sessions);
        return sessions
    },

    async getSessionsByEquipmentInRangeDate(equipmentId, startDateStr, endDateStr) {
        const nowStr = new Date().toJSON();
        let sessions = await strapi.entityService.findMany('api::session.session', {
            filters: {
                equipment: equipmentId,
                end: {
                    $gte: nowStr,
                },
                $or: [
                    {
                        begin: {
                            $between: [startDateStr, endDateStr],
                        }
                    },
                    {
                        end: {
                            $between: [startDateStr, endDateStr],
                        }
                    },
                    {
                        begin: {
                            $lte: startDateStr,
                        },
                        end: {
                            $gte: endDateStr,
                        }
                    }
                ],
            },
            sort: { begin: 'ASC' },
        });
        return sessions
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
