"use strict";
/**
 * comment controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController('api::comment.comment', ({ strapi }) => ({
    async create(ctx) {
        const user = ctx.state.user;
        if (!user)
            return ctx.unauthorized();
        ctx.request.body.data = {
            ...ctx.request.body.data,
            user: user.id,
            isApproved: false,
        };
        return super.create(ctx);
    },
    async update(ctx) {
        var _a, _b;
        const user = ctx.state.user;
        if (!user)
            return ctx.unauthorized();
        // Strapi 5 REST endpoints pass documentId in ctx.params.id
        const comment = await strapi.documents('api::comment.comment').findOne({
            documentId: ctx.params.id,
            populate: ['user'],
        });
        if (!comment || String((_a = comment.user) === null || _a === void 0 ? void 0 : _a.id) !== String(user.id)) {
            return ctx.forbidden('You can only update your own comment');
        }
        if ((_b = ctx.request.body) === null || _b === void 0 ? void 0 : _b.data) {
            delete ctx.request.body.data.user;
            delete ctx.request.body.data.isApproved;
        }
        return super.update(ctx);
    },
    async delete(ctx) {
        var _a;
        const user = ctx.state.user;
        if (!user)
            return ctx.unauthorized();
        // Strapi 5 REST endpoints pass documentId in ctx.params.id
        const comment = await strapi.documents('api::comment.comment').findOne({
            documentId: ctx.params.id,
            populate: ['user'],
        });
        if (!comment || String((_a = comment.user) === null || _a === void 0 ? void 0 : _a.id) !== String(user.id)) {
            return ctx.forbidden('You can only delete your own comment');
        }
        return super.delete(ctx);
    },
}));
