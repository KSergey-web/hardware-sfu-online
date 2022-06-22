module.exports = {
  routes: [
    {
      // Path defined with a URL parameter
      method: 'GET',
      path: '/subgroups/my-subgroups',
      handler: 'custom-subgroup.getSubgroupsByCurrentUser',
      config: {},
    },
    {
      // Path defined with a URL parameter
      method: 'GET',
      path: '/subgroups/by-current-creator',
      handler: 'custom-subgroup.getSubgroupsByCurrentCreator',
      config: {},
    },
  ],
};
