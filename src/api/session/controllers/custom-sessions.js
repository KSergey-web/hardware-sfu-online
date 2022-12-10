'use strict';

const { TEACHER } = require('../../../constants');
const DetailedError = require('../../../custom-code/detailed-error.class');

module.exports = {
  get sessionService() {
    return strapi.service('api::session.session');
  },

  async canConnect(ctx) {
    const sessionId = ctx.params.id;
    const user = ctx.state.user;
    const session = await this.sessionService.getPopulatedSessionById(
      sessionId,
    );
    if (!session) {
      return ctx.notFound('Session not found', { sessionId: sessionId });
    }
    if (session.user.id !== user.id && user.role.type !== TEACHER) {
      return ctx.forbidden('You have no access to this session', {
        yourRole: user.role.type,
      });
    }
    const isSessionInProgress = await this.sessionService.isSessionInProgress(
      session,
    );
    if (!isSessionInProgress) {
      const { begin, end } = session;
      return ctx.badRequest('Session is not in progress status', {
        begin,
        end,
      });
    }
    return (ctx.body = { session });
  },

  async getSessionsByCurrentUser(ctx) {
    const user = ctx.state.user;
    const sessions = await this.sessionService.getSessionsByUser(user.id);
    ctx.body = { sessions };
  },
  async getSessionsByCurrentCreator(ctx) {
    const user = ctx.state.user;
    const sessions = await this.sessionService.getSessionsByCreator(user.id);
    ctx.body = { sessions };
  },

  async getStartedAndNearestSessions(ctx) {
    const sessions = await this.sessionService.getStartedAndNearestSessions();
    ctx.body = { sessions };
  },

  async getSessionsByEquipmentInRangeDate(ctx) {
    const { equipmentId, begin, end } = ctx.params;
    const sessions = await strapi
      .service('api::session.session')
      .getSessionsByEquipmentInRangeDate(equipmentId, begin, end);
    ctx.body = { sessions };
  },

  async signupForSession(ctx) {
    const { booking: bookingId, begin, end } = ctx.request.body.data;
    const user = ctx.state.user;
    try {
      const session = await strapi
        .service('api::session.session')
        .createSessionByBooking(bookingId, begin, end, user.id);
      ctx.body = { session };
    } catch (err) {
      if (err instanceof DetailedError) {
        console.error(err);
        return ctx.badRequest(err.message, err.details);
      } else {
        throw err;
      }
    }
  },
};
