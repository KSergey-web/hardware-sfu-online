'use strict';

/**
 * subgroup service.
 */

const { sanitizeUser } = require('../../../sanitize-user.function');
const { createCoreService } = require('@strapi/strapi').factories;
const API_SUBGROUPS_STR = 'api::subgroup.subgroup';

module.exports = createCoreService(API_SUBGROUPS_STR, () => ({
  sanitazeUsersPropertiesInSubgroup(subgroup) {
    if (subgroup.users) {
      subgroup.users = subgroup.users.map(sanitizeUser);
    }
    subgroup.creator = sanitizeUser(subgroup.creator);
    return subgroup;
  },

  sanitazeUsersPropertiesInSubgroups(subgroups) {
    return (subgroups = subgroups.map(this.sanitazeUsersPropertiesInSubgroup));
  },

  // Method 1: Creating an entirely custom service
  async getSubgroupsByUser(userId) {
    let subgroups = await strapi.entityService.findMany(API_SUBGROUPS_STR, {
      filters: {
        users: { $in: userId },
      },
      populate: ['creator'],
      sort: { name: 'ASC' },
    });
    subgroups = this.sanitazeUsersPropertiesInSubgroups(subgroups);
    return subgroups;
  },

  async getSubgroupsByCreator(creatorId) {
    let subgroups = await strapi.entityService.findMany(API_SUBGROUPS_STR, {
      filters: {
        creator: creatorId,
      },
      populate: ['creator'],
      sort: { name: 'ASC' },
    });
    subgroups = this.sanitazeUsersPropertiesInSubgroups(subgroups);
    return subgroups;
  },
}));
