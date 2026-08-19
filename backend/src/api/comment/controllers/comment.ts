/**
 * comment controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::comment.comment', ({ strapi }) => ({
	async create(ctx) {
		const user = ctx.state.user;
		if (!user) return ctx.unauthorized();

		ctx.request.body.data = {
			...ctx.request.body.data,
			user: user.id,
			isApproved: false,
		};

		return super.create(ctx);
	},

	async update(ctx) {
		const user = ctx.state.user;
		if (!user) return ctx.unauthorized();

		// Strapi 5 REST endpoints pass documentId in ctx.params.id
		const comment = await strapi.documents('api::comment.comment').findOne({
			documentId: ctx.params.id,
			populate: ['user'],
		});

		if (!comment || String(comment.user?.id) !== String(user.id)) {
			return ctx.forbidden('You can only update your own comment');
		}

		if (ctx.request.body?.data) {
			delete ctx.request.body.data.user;
			delete ctx.request.body.data.isApproved;
		}

		return super.update(ctx);
	},

	async delete(ctx) {
		const user = ctx.state.user;
		if (!user) return ctx.unauthorized();

		// Strapi 5 REST endpoints pass documentId in ctx.params.id
		const comment = await strapi.documents('api::comment.comment').findOne({
			documentId: ctx.params.id,
			populate: ['user'],
		});

		if (!comment || String(comment.user?.id) !== String(user.id)) {
			return ctx.forbidden('You can only delete your own comment');
		}

		return super.delete(ctx);
	},
}));
