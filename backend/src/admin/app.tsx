import type { StrapiApp } from '@strapi/strapi/admin';
import { SITE_NAME } from '../CONSTANTS';
import { RU } from './translations/ru';

import './app.css';

// Использлование ссылки на фронтенд из .env
// @ts-ignore
const FRONTEND_URL = window.__FRONTEND_URL__;

export default {
	// config: {
	// 	locales: ['ru'],
	// 	translations: {
	// 		ru: RU,
	// 	},
	// },
	bootstrap(app: StrapiApp) {
		console.log(app);

		const init = () => {
			const logo = document.querySelector('img[alt="Application logo"]');

			if (!logo) {
				requestAnimationFrame(init);
				return;
			}

			const container = logo.closest('div[class]')?.parentElement;
			if (!container) return;

			container.title = `Open - ${SITE_NAME}`;
			container.style.cursor = 'pointer';
			container.addEventListener('click', () => {
				FRONTEND_URL && window.open(FRONTEND_URL, '_blank', 'noopener,noreferrer');
			});
		};

		init();
	},
};
