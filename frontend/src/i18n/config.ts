export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ru';

export const locales = ['ru', 'en'] as const;

export function ogLocale(locale: Locale) {
	return locale === 'ru' ? 'ru_RU' : locale === 'en' ? 'en_EN' : 'ru_RU';
}
