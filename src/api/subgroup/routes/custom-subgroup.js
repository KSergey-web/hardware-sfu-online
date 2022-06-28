module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/subgroups/by-current-user',
      handler: 'custom-subgroup.getSubgroupsByCurrentUser',
      config: {},
    },
    {
      method: 'GET',
      path: '/subgroups/by-current-creator',
      handler: 'custom-subgroup.getSubgroupsByCurrentCreator',
      config: {},
    },
  ],
};
