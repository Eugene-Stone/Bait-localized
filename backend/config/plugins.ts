import type { Core } from '@strapi/strapi';

const allowedMediaTypes = [
	'image/*',
	'video/*',
	'audio/*',
	'application/pdf',
	'application/msword',
	'application/vnd.openxmlformats-officedocument.*',
	'text/plain',
	'text/csv',
];

const deniedExecutableTypes = [
	'application/vnd.microsoft.portable-executable',
	'application/x-msdownload',
	'application/x-msdos-program',
	'application/x-executable',
	'application/x-dosexec',
	'application/x-sh',
	'text/x-shellscript',
	'application/x-mach-binary',
];

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
	'users-permissions': {
		config: {
			jwtManagement: 'legacy-support',
			sessions: {
				httpOnly: true,
				secure: env('NODE_ENV') === 'production',
				sameSite: 'lax',
			},
		},
	},
	upload: {
		config: {
			security: {
				allowedTypes: allowedMediaTypes,
				deniedTypes: deniedExecutableTypes,
			},
		},
	},
	// seo: {
	// 	enabled: true,
	// },
	'seo-vitals': { enabled: true },
	'strapi-dz-component-duplicator': {
		enabled: true,
	},
	'strapi-code-editor-custom-field': {
		enabled: true,
	},
	// Когда включена мультиязычность работает неккоректно
	'preview-button': {
		config: {
			enabled: true,
			contentTypes: [
				{
					uid: 'api::homepage.homepage',
					draft: {
						// Стандарт
						// url: `${process.env.FRONTEND}`,

						// Для мультиязычного сайта
						url: `${process.env.FRONTEND}{locale}`,
					},
					published: {
						// Стандарт
						// url: `${process.env.FRONTEND}`,

						// Для мультиязычного сайта
						url: `${process.env.FRONTEND}{locale}`,
					},
				},
				{
					uid: 'api::page.page',
					draft: {
						// Стандарт
						// url: `${process.env.FRONTEND}/{slug}`,

						// Для мультиязычного сайта
						url: `${process.env.FRONTEND}{locale}/{slug}`,
					},
					published: {
						// Стандарт
						// url: `${process.env.FRONTEND}/{slug}`,

						// Для мультиязычного сайта
						url: `${process.env.FRONTEND}{locale}/{slug}`,
					},
				},
				{
					uid: 'api::course.course',
					draft: {
						// Стандарт
						// url: `${process.env.FRONTEND}/{slug}`,

						// Для мультиязычного сайта
						url: `${process.env.FRONTEND}{locale}/courses/{slug}`,
					},
					published: {
						// Стандарт
						// url: `${process.env.FRONTEND}/{slug}`,

						// Для мультиязычного сайта
						url: `${process.env.FRONTEND}{locale}/courses/{slug}`,
					},
				},
			],
		},
	},
	email: {
		config: {
			provider: '@strapi/provider-email-nodemailer',
			providerOptions: {
				host: env('SMTP_HOST'),
				port: env.int('SMTP_PORT'),
				// Включаем пул соединений и жестко ограничиваем его до 1
				pool: true,
				maxConnections: 1,
				maxMessages: 1,
				auth: {
					user: env('SMTP_USERNAME'),
					pass: env('SMTP_PASSWORD'),
				},
			},
			settings: {
				defaultFrom: env('SMTP_FROM'),
				defaultReplyTo: env('SMTP_FROM'),
			},
		},
	},
});

export default config;
