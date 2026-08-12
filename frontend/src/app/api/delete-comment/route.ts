import { BACKEND_URL } from '@/constants';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
	const bodyId = await request.json();
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

	const response = await fetch(`${BACKEND_URL}/api/comments/${bodyId}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});

	// Проверяем, есть ли тело ответа
	const text = await response.text();
	const data = text ? JSON.parse(text) : null;

	if (!response.ok) {
		return NextResponse.json(data, {
			status: response.status,
		});
	}

	// Сбрасываем кэш страниц
	revalidatePath('/courses/[slug]', 'page');
	revalidatePath('/profile/comments', 'page');

	return NextResponse.json(data);
}
