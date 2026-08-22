export async function initialDetectUser() {
	const response = await fetch('/api/me', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const userInitial = await response.json();
	if (!response.ok) {
		throw new Error(userInitial.error?.message ?? 'get me error');
	}

	return userInitial;
}
