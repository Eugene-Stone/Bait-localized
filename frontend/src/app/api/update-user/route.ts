import { BACKEND_URL } from '@/constants';
import { defaultLocale, Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { validateRequestOrigin } from '@/validation/csrf';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
	const originError = validateRequestOrigin(request);

	if (originError) {
		return originError;
	}

	// Берем locale из Cookie, если middleware(proxy.ts) сохраняет текущую локаль в куки
	const cookieStore = await cookies();
	const locale = (cookieStore.get('NEXT_LOCALE')?.value as Locale) || defaultLocale;

	const dict = await getDictionary(locale);

	const body = await request.json();
	const token = (await cookies()).get('jwt')?.value;

	if (!token) {
		return NextResponse.json(
			{
				error: {
					message: dict.errors.needToLogin,
				},
			},
			{
				status: 401,
			},
		);
	}

	const { userId, ...dataWithoutId } = body;

	const response = await fetch(`${BACKEND_URL}/api/users/${userId}?populate:*`, {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(dataWithoutId),
	});

	const data = await response.json();

	if (!response.ok) {
		return NextResponse.json(data, {
			status: response.status,
		});
	}

	// Сбрасываем кэш страниц
	revalidatePath(`/[locale]/`, 'page');
	revalidatePath(`/[locale]/profile/info`, 'page');

	// Сбросит кэш ВСЕХ страниц внутри группы [locale]
	// revalidatePath('/[locale]', 'layout');

	return NextResponse.json(data);
}
