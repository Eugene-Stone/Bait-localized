import { Locale, locales } from '@/i18n/config';
import { notFound } from 'next/navigation';

/**
 * Проверяем locale, который пришел из URL.
 */
export async function resolveLocale(params: Promise<{ locale: string }>): Promise<Locale> {
	const { locale } = await params;

	if (!locales.includes(locale as Locale)) {
		notFound();
	}

	return locale as Locale;
}
