module.exports = (config) => {
  return (ctx, next) => {
    const { id } = ctx[config.path];
    if (id) {
      return next();
    }
    return ctx.badRequest('subgroup id is undefined', {
      id,
    });
  };
};
