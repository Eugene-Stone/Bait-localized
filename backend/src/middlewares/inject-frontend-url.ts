// Cоздание ссылки на фронтенд из .env
// @ts-ignore
module.exports = (config, { strapi }) => {
	// @ts-ignore
	return async (ctx, next) => {
		await next();

		// Только для HTML ответов админки
		if (ctx.type === 'text/html' && ctx.url.startsWith('/admin')) {
			const body = ctx.body;
			if (typeof body === 'string') {
				const frontendUrl = process.env.FRONTEND || 'https://bait.vercel-2.app';
				ctx.body = body.replace(
					'<head>',
					`<head><script>window.__FRONTEND_URL__="${frontendUrl}";</script>`,
				);
			}
		}
	};
};
