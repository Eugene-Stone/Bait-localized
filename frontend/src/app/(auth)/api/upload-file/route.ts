import { BACKEND_URL } from '@/constants';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const token = (await cookies()).get('jwt')?.value;

	if (!token) {
		return NextResponse.json(
			{ error: { message: 'Необходимо авторизоваться' } },
			{ status: 401 },
		);
	}

	try {
		// Получаем FormData из запроса вместо request.json()
		const formData = await request.formData();

		const response = await fetch(`${BACKEND_URL}/api/upload`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				// Content-Type передавать не нужно, fetch сам выставит boundary для multipart/form-data
			},
			body: formData,
		});

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json(data, { status: response.status });
		}

		revalidatePath('/', 'page');

		return NextResponse.json(data);
	} catch (error) {
		return NextResponse.json(
			{ error: { message: 'Ошибка при обработке файла на сервере' } },
			{ status: 500 },
		);
	}
}
