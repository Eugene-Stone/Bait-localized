import { BACKEND_URL } from '@/constants';
import { cookies } from 'next/headers';

export async function getMe() {
	return {
		id: 1,
		documentId: 'sldjfnkdjfngkjdnfg',
		username: 'john_doe',
		email: 'john@example.com',
		provider: 'local',
		confirmed: true,
		blocked: false,
		createdAt: '2026-08-21T10:00:00.000Z',
		updatedAt: '2026-08-21T10:00:00.000Z',

		role: {
			id: 1,
			documentId: 'role-1',
			name: 'Authenticated',
			description: 'Default authenticated user role',
			type: 'authenticated',
			createdAt: '2026-08-21T10:00:00.000Z',
			updatedAt: '2026-08-21T10:00:00.000Z',
		},
	};

	// const cookieStore = await cookies();
	// const token = cookieStore.get('jwt')?.value;

	// if (!token) {
	// 	return null;
	// }

	// try {
	// 	const response = await fetch(`${BACKEND_URL}/api/users/me?populate=*`, {
	// 		headers: {
	// 			Authorization: `Bearer ${token}`,
	// 		},
	// 		cache: 'no-store', // Отключаем fetch-кэш
	// 	});

	// 	if (!response.ok) {
	// 		return null;
	// 	}

	// 	return await response.json();
	// } catch (error) {
	// 	console.error('Failed to fetch user:', error);
	// 	return null;
	// }
}
