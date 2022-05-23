'use strict';

const { TEACHER } = require('../../../constants');

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
    if (session.user.id !== user.id || user.role.type !== TEACHER) {
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
};
