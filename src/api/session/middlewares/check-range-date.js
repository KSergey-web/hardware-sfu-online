const sessionValidation = require('../validators/validation');

module.exports = (config) => {
  return (ctx, next) => {
    const { begin, end } = ctx[config.path];
    const resValidation = sessionValidation.checkValidBeginAndEnd(begin, end);
    if (resValidation.isValid) {
      return next();
    }
    return ctx.badRequest(resValidation.message, { begin, end });
  };
};
