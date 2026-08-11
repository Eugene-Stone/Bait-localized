import { BACKEND_URL } from '@/constants';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const body = await request.json();
	const token = (await cookies()).get('jwt')?.value;

	if (!token) {
		return NextResponse.json(
			{
				error: {
					message: 'Необходимо авторизоваться',
				},
			},
			{
				status: 401,
			},
		);
	}

	const response = await fetch(`${BACKEND_URL}/api/comments`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
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

	return NextResponse.json(data);
}
