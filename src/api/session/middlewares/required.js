module.exports = (config) => {
  return (ctx, next) => {
    const paramsForValidate = config.params;
    const params = ctx[config.path];
    for (let param of paramsForValidate) {
      if (!params[param]) {
        return ctx.badRequest(`param ${param} not setted`, { params });
      }
    }
    return next();
  };
};
