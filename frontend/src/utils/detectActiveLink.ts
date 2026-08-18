import { Locale, locales } from '@/i18n/config';

export function detectActiveLink(locale: Locale, pathname: string, menuItemPath: string) {
	// 1. Приводим путь к формату с ведущим слэшем
	const cleanItemPath = menuItemPath.startsWith('/') ? menuItemPath : `/${menuItemPath}`;

	// 2. Извлекаем путь без локали, если она уже указана
	// Проверяем как текущую locale, так и любую из поддерживаемых locales
	const hasCurrentLocale =
		cleanItemPath === `/${locale}` || cleanItemPath.startsWith(`/${locale}/`);

	let pathWithoutLocale = cleanItemPath;

	if (hasCurrentLocale) {
		pathWithoutLocale = cleanItemPath.replace(new RegExp(`^/${locale}`), '') || '/';
	} else {
		// Дополнительная проверка на случай, если пришла ДРУГАЯ локаль из массива locales
		const otherLocale = locales.find(
			(loc) => cleanItemPath === `/${loc}` || cleanItemPath.startsWith(`/${loc}/`),
		);
		if (otherLocale) {
			pathWithoutLocale = cleanItemPath.replace(new RegExp(`^/${otherLocale}`), '') || '/';
		}
	}

	// 3. Формируем итоговый целевой путь строго с актуальной locale
	const targetPath = pathWithoutLocale === '/' ? `/${locale}` : `/${locale}${pathWithoutLocale}`;

	// 4. Нормализуем текущий pathname (убираем концевой слэш)
	const currentPath =
		pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

	// 5. Проверяем активность
	const isActive =
		targetPath === `/${locale}`
			? currentPath === targetPath
			: currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);

	return isActive;
}
