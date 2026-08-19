type Entry = {
	count: number;
	resetAt: number;
};

const entries = new Map<string, Entry>();
const LIMIT = 5;
const WINDOW_MS = 15 * 60 * 1000;

export default async (policyContext: any) => {
	const request = policyContext.request;
	const ip = request.ip || request.headers['x-forwarded-for']?.split(',')[0]?.trim() || 'unknown';
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
