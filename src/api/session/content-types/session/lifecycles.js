const sessionValidation = require('../../validators/validation');
const DetailedError = require('../../../../custom-code/detailed-error.class');

module.exports = {
  async beforeCreate(event) {
    const {
      data: { begin, end, equipment },
    } = event.params;
    const resValidation = sessionValidation.checkValidBeginAndEnd(begin, end);
    if (!resValidation.isValid) {
      throw new DetailedError(resValidation.message, { begin, end });
    }
    const sessions = await strapi
      .service('api::session.session')
      .getSessionsByEquipmentInRangeDate(equipment, begin, end);
    if (sessions.length != 0) {
      throw new DetailedError('Selected time range is busy', {
        busy: sessions[0],
      });
    }
  },
  async beforeUpdate(event) {
    const {
      data: { begin, end, equipment },
      where: { id },
    } = event.params;
    const resValidation = sessionValidation.checkValidBeginAndEnd(begin, end);
    if (!resValidation.isValid) {
      throw new DetailedError(resValidation.message, { begin, end });
    }
    const sessions = await strapi
      .service('api::session.session')
      .getSessionsByEquipmentInRangeDate(equipment, begin, end);
    if (sessions.length != 0 && sessions[0].id != id) {
      throw new DetailedError('Selected time range is busy', {
        busy: sessions[0],
      });
    }
  },
};
