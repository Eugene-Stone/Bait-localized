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

	return NextResponse.json({ locale, dict });
}
