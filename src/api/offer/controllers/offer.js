"use strict";

/**
 * offer controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::offer.offer", ({ strapi }) => ({
  async deleteAll(ctx) {
    try {
      const userId = ctx.state.user.id;
      const user = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        userId,
        {
          populate: ["offers"],
        }
      );
      console.log(user.offers);
      for (let offer of user.offers) {
        await strapi.entityService.delete("api::offer.offer", offer.id);
      }
      return { message: "all offers deleted" };
    } catch (error) {
      ctx.response.status = 500;
      return { message: error.message };
    }
  },
}));
