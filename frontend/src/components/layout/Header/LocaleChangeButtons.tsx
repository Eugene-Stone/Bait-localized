'use client';

import { Locale } from '@/i18n/config';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function LocaleChangeButtons({ locale }: { locale: Locale }) {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// Функция для формирования правильной ссылки под нужную локаль
	const getLocalizedPath = (targetLocale: Locale) => {
		if (!pathname) return `/${targetLocale}`;

		const segments = pathname.split('/');

		// Заменяем первый сегмент (локаль) на целевую локаль
		// Если pathname = '/ru/courses/js', segments = ['', 'ru', 'courses', 'js']
		segments[1] = targetLocale;

		const newPathname = segments.join('/');
		const queryString = searchParams.toString();

		// Сохраняем query-параметры, если они есть (?search=react&page=2)
		return queryString ? `${newPathname}?${queryString}` : newPathname;
	};

	return (
		<li>
			<Link
				className={locale === 'ru' ? 'active-lang' : ''}
				style={{ zoom: 0.75 }}
				href={getLocalizedPath('ru')}>
				RU
			</Link>
			<Link
				className={locale === 'en' ? 'active-lang' : ''}
				style={{ zoom: 0.75 }}
				href={getLocalizedPath('en')}>
				EN
			</Link>
		</li>
	);
}
