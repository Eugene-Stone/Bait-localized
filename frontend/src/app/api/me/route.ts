import { BACKEND_URL } from '@/constants';
import { defaultLocale, Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { validateRequestOrigin } from '@/validation/csrf';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	const originError = validateRequestOrigin(request);

	if (originError) {
		return originError;
	}

	// Берем locale из Cookie, если middleware(proxy.ts) сохраняет текущую локаль в куки
	const cookieStore = await cookies();
	const locale = (cookieStore.get('NEXT_LOCALE')?.value as Locale) || defaultLocale;

	const dict = await getDictionary(locale);
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

	// const response = await fetch(`${BACKEND_URL}/api/users/me?populate=*`, {
	const response = await fetch(`${BACKEND_URL}/api/users/me`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		cache: 'no-store',
	});

	const data = await response.json();

	if (!response.ok) {
		return NextResponse.json(data, {
			status: response.status,
		});
	}

	return NextResponse.json({
		// user: data.user,
		user: data,
	});
}
