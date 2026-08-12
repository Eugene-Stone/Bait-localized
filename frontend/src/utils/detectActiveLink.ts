import { Locale } from '@/i18n/config';

export function detectActiveLink(locale: Locale, pathname: string, menuItemPath: string) {
	// Проверка с учетом границ вложенных путей
	// 1. Приводим путь элемента к формату с ведущим слэшем ("/page")
	const cleanItemPath = menuItemPath.startsWith('/') ? menuItemPath : `/${menuItemPath}`;

	// 2. Формируем итоговый целевой путь с учетом локали
	const targetPath = cleanItemPath === '/' ? `/${locale}` : `/${locale}${cleanItemPath}`;

	// 3. Нормализуем текущий pathname (убираем концевой слэш, если это не корень)
	const currentPath =
		pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

	// 4. Проверяем активность
	const isActive =
		targetPath === `/${locale}`
			? currentPath === targetPath
			: currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);

	return isActive;
}
