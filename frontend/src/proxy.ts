import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { defaultLocale, Locale, locales } from '@/i18n/config';

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Извлекаем локаль из URL, если она там есть
	const currentLocale = locales.find(
		(locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
	);

	// 1. Если локаль есть в URL — пропускаем запрос и записываем локаль в куки
	if (currentLocale) {
		const savedLocale = request.cookies.get('NEXT_LOCALE')?.value;

		// Если кука уже совпадает с текущей локалью в URL — отдаем чистый NextResponse.next() БЕЗ установки куки!
		if (savedLocale === currentLocale) {
			return NextResponse.next();
		}

		// Обновляем куку только если она отличается от локали в URL
		const response = NextResponse.next();

		response.cookies.set('NEXT_LOCALE', currentLocale, {
			path: '/',
			maxAge: 60 * 60 * 24 * 365, // 1 год
			sameSite: 'lax',
		});

		return response;
	}

	// 2. Если локали в URL нет — проверяем сохраненную куку или берем defaultLocale
	const savedLocale = request.cookies.get('NEXT_LOCALE')?.value;
	const targetLocale =
		savedLocale && locales.includes(savedLocale as Locale) ? savedLocale : defaultLocale;

	// Делаем редирект на целевую локаль
	const url = request.nextUrl.clone();
	url.pathname = `/${targetLocale}${pathname}`;

	const response = NextResponse.redirect(url);

	response.cookies.set('NEXT_LOCALE', targetLocale, {
		path: '/',
		maxAge: 60 * 60 * 24 * 365,
		sameSite: 'lax',
	});

	return response;
}

export const config = {
	/*
	 * Запускаем Proxy для всех страниц,
	 * кроме:
	 *
	 * /api
	 * /_next/static
	 * /_next/image
	 * файлов с расширением
	 */
	matcher: ['/((?!api|_next/static|_next/image|.*\\..*).*)'],
};
