'use strict';

/**
 * session service.
 */
const { sanitizeUser } = require('../../../sanitize-user.function');
const { createCoreService } = require('@strapi/strapi').factories;
const API_SESSIONS_STR = 'api::session.session';

module.exports = createCoreService(API_SESSIONS_STR, () => ({
  async getPopulatedSessionById(sessionId) {
    const session = await strapi.query(API_SESSIONS_STR).findOne({
      where: { id: sessionId },
      populate: {
        user: true,
        equipment: true,
        creator: true,
      },
    });
    return session ? this.sanitazeUsersPropertiesInSession(session) : null;
  },

  sanitazeUsersPropertiesInSession(session) {
    session.user = sanitizeUser(session.user);
    session.creator = sanitizeUser(session.creator);
    return session;
  },

  sanitazeUsersPropertiesInSessions(sessions) {
    return (sessions = sessions.map(this.sanitazeUsersPropertiesInSession));
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
    let sessions = await strapi.entityService.findMany(API_SESSIONS_STR, {
      filters: {
        user: userId,
        end: {
          $gte: new Date().toJSON(),
        },
      },
      populate: ['user', 'creator', 'equipment'],
      sort: { begin: 'ASC' },
    });
    sessions = this.sanitazeUsersPropertiesInSessions(sessions);
    return sessions;
  },
  async getSessionsByCreator(creatorId) {
    const now = new Date();
    const nowStr = now.toJSON();
    let sessions = await strapi.entityService.findMany(API_SESSIONS_STR, {
      filters: {
        creator: creatorId,
        end: {
          $gte: nowStr,
        },
      },
      populate: ['user', 'creator', 'equipment'],
      sort: { begin: 'ASC' },
    });
    sessions = this.sanitazeUsersPropertiesInSessions(sessions);
    return sessions;
  },
  async getStartedAndNearestSessions() {
    const now = new Date();
    const nowStr = now.toJSON();
    const tenMinutesInSeconds = 600000;
    const after10Minutes = new Date(+now + tenMinutesInSeconds).toJSON();
    let sessions = await strapi.entityService.findMany(API_SESSIONS_STR, {
      filters: {
        $or: [
          {
            begin: {
              $between: [nowStr, after10Minutes],
            },
          },
          {
            begin: {
              $lte: nowStr,
            },
          },
        ],
        end: {
          $gte: nowStr,
        },
      },
      populate: ['user', 'creator', 'equipment'],
      sort: { begin: 'ASC' },
    });
    sessions = this.sanitazeUsersPropertiesInSessions(sessions);
    return sessions;
  },

  async getSessionsByEquipmentInRangeDate(
    equipmentId,
    startDateStr,
    endDateStr,
  ) {
    const nowStr = new Date().toJSON();
    let sessions = await strapi.entityService.findMany(API_SESSIONS_STR, {
      filters: {
        equipment: equipmentId,
        end: {
          $gte: nowStr,
        },
        $or: [
          {
            begin: {
              $between: [startDateStr, endDateStr],
            },
          },
          {
            end: {
              $between: [startDateStr, endDateStr],
            },
          },
          {
            begin: {
              $lte: startDateStr,
            },
            end: {
              $gte: endDateStr,
            },
          },
        ],
      },
      sort: { begin: 'ASC' },
    });
    return sessions;
  },
}));
