"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entries = new Map();
const LIMIT = 5;
const WINDOW_MS = 15 * 60 * 1000;
exports.default = async (policyContext) => {
    var _a, _b;
    const request = policyContext.request;
    const ip = request.ip || ((_b = (_a = request.headers['x-forwarded-for']) === null || _a === void 0 ? void 0 : _a.split(',')[0]) === null || _b === void 0 ? void 0 : _b.trim()) || 'unknown';
    const now = Date.now();
    const current = entries.get(ip);
    if (!current || current.resetAt <= now) {
        entries.set(ip, { count: 1, resetAt: now + WINDOW_MS });
        return true;
    }
    if (current.count >= LIMIT) {
        policyContext.status = 429;
        policyContext.body = {
            error: { message: 'Too many form submissions. Please try again later.' },
        };
        return false;
    }
    current.count += 1;
    return true;
};
