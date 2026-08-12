import { Locale } from './config';

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

const dictionaries = {
	// ru: () => import('./dictionaries/ru.json').then((m) => m.default),
	ru: () => import('./dictionaries/en.json').then((m) => m.default),
	en: () => import('./dictionaries/en.json').then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
	return dictionaries[locale]();
}
