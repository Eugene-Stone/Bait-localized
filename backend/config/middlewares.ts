import type { Core } from '@strapi/strapi';

const config: Core.Config.Middlewares = [
	'strapi::logger',
	'strapi::errors',
	// 'strapi::security',
	{
		name: 'strapi::security',
		config: {
			contentSecurityPolicy: {
				useDefaults: true,
				directives: {
					'script-src-elem': ["'self'", "'unsafe-inline'", 'cdn.jsdelivr.net'],
					upgradeInsecureRequests: null,
				},
			},
		},
	},
	// 'strapi::cors',
	// Настройка для безопасности
	{
		name: 'strapi::cors',
		config: {
			origin: process.env.ALLOWED_ORIGINS
				? process.env.ALLOWED_ORIGINS.split(',')
						.map((s) => s.trim())
						.filter(Boolean)
				: ['http://localhost:3000'],
			methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
			headers: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
			credentials: true,
		},
	},
	'strapi::poweredBy',
	'strapi::query',
	'strapi::body',
	// 'strapi::session',
	// Настройка для безопасности
	{
		name: 'strapi::session',
		config: {
			cookie: {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax',
			},
		},
	},
	'strapi::favicon',
	'strapi::public',
	'global::inject-frontend-url', // Включает создание ссылки на фронтенд из .env
];

export default config;
