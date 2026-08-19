"use strict";
/**
 * form-request router
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreRouter('api::form-request.form-request', {
    config: {
        create: {
            policies: ['global::rate-limit-form-request'],
        },
    },
});
