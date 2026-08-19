/**
 * form-request router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::form-request.form-request', {
	config: {
		create: {
			policies: ['global::rate-limit-form-request'],
		},
	},
});
