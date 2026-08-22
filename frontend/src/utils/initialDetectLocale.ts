export async function initialDetectLocale() {
	const response = await fetch('/api/locale', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const localePackInitial = await response.json();

	if (!response.ok) {
		throw new Error(localePackInitial.error?.message ?? 'get locale error');
	}

	return localePackInitial;
}
