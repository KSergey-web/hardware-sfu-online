'use strict';

module.exports = {
  get subgroupsService() {
    return strapi.service('api::subgroup.subgroup');
  },
  get subgroupsController() {
    return strapi.controller('api::subgroup.subgroup');
  },

  async getSubgroupsByCurrentUser(ctx) {
    const user = ctx.state.user;
    const subgroups = await this.subgroupsService.getSubgroupsByUser(user.id);
    ctx.body = { subgroups };
  },
  async getSubgroupsByCurrentCreator(ctx) {
    const user = ctx.state.user;
    const subgroups = await this.subgroupsService.getSubgroupsByCreator(
      user.id,
    );
    ctx.body = { subgroups };
  },
};
