import { BACKEND_URL } from '@/constants';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const body = await request.json();

	const response = await fetch(`${BACKEND_URL}/api/auth/local`, {
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

	const token = data.jwt ?? data.accessToken ?? data.token;

	if (!token) {
		return NextResponse.json(
			{
				error: {
					message: 'Auth token missing from backend response',
				},
			},
			{ status: 500 },
		);
	}

	// 30 дней в секундах (60 sec * 60 min * 24 hours * 30 days)
	const MAX_AGE = 60 * 60 * 24 * 30;
	const cookieStore = await cookies();

	cookieStore.set('jwt', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		path: '/',
		maxAge: MAX_AGE,
		expires: new Date(Date.now() + MAX_AGE * 1000),
	});

	return NextResponse.json({
		user: data.user,
	});
}
