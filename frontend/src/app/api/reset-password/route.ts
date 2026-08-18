import { BACKEND_URL } from '@/constants';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	try {
		const body = await request.json();

		const response = await fetch(`${BACKEND_URL}/api/auth/reset-password`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});

		// const data = await response.json();
		// Если бэкенд возвращает 204 No Content или пустое тело
		const text = await response.text();
		const data = text ? JSON.parse(text) : {};

		if (!response.ok) {
			return NextResponse.json(
				{ error: data.error ?? { message: 'Failed to process request' } },
				{ status: response.status },
			);
		}

		return NextResponse.json(data, { status: response.status });
	} catch (error) {
		return NextResponse.json({ error: { message: 'Internal Server Error' } }, { status: 500 });
	}
}
