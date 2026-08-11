import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { defaultLocale, locales } from '@/i18n/config';

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Проверяем, начинается ли URL с одной из поддерживаемых локалей
	const hasLocale = locales.some(
		(locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
	);

	// Если локаль уже есть — ничего не делаем
	if (hasLocale) {
		return NextResponse.next();
	}

	// Если локали нет — добавляем язык по умолчанию
	const url = request.nextUrl.clone();

	url.pathname = `/${defaultLocale}${pathname}`;

	return NextResponse.redirect(url);
}

export const config = {
	matcher: [
		/*
		 * Запускаем Proxy для всех страниц,
		 * кроме:
		 *
		 * /api
		 * /_next/static
		 * /_next/image
		 * файлов с расширением
		 */
		'/((?!api|_next/static|_next/image|.*\\..*).*)',
	],
};
