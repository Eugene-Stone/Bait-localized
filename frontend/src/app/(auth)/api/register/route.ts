import { BACKEND_URL } from '@/constants';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const body = await request.json();

	const response = await fetch(`${BACKEND_URL}/api/auth/local/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});

	const data = await response.json();

	if (!response.ok) {
		return NextResponse.json(data, {
			status: response.status,
		});
	}

	// При подтверждении почты это не требуется
	// (await cookies()).set('jwt', data.jwt, {
	// 	httpOnly: true,
	// 	secure: process.env.NODE_ENV === 'production',
	// 	sameSite: 'lax',
	// 	path: '/',
	// });

	return NextResponse.json({
		user: data.user,
	});
}
