module.exports = {
    async hasAccess(ctx) {
        try {
          console.log(ctx.query);
          console.log(ctx.params);
          console.log(ctx.state.user);
          console.log('happy');
          const p = strapi.controller('plugin::users-permissions.user');
          ctx.body = 'ok';
        } catch (err) {
          ctx.body = err;
        }
      },
  };