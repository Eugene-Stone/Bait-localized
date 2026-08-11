import { BACKEND_URL } from '@/constants';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const body = await request.json();

	const response = await fetch(`${BACKEND_URL}/api/auth/reset-password`, {
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

	// return NextResponse.json({
	// 	user: data.user,
	// });
}
