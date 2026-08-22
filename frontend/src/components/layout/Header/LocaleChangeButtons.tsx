'use client';

import { Locale } from '@/i18n/config';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useTransition } from 'react';

// Каждый клиентский компонент, в котором есть useSearchParams, нужно переписать по следующей схеме — вынести работу с хуком во внутренний подкомпонент и обернуть его в <Suspense>:

// 1. Выносим логику с хуком в отдельный внутренний компонент
function LocaleChangeButtonsContent({ locale }: { locale: Locale }) {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const router = useRouter();
	const [isPending, startTransition] = useTransition();

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

	// Оптимизация, useRouter и startTransition дает React сигнал выполнять смену маршрута с низким приоритетом, оставляя интерфейс отзывчивым.
	const handleLocaleSwitch = (targetLocale: Locale) => {
		if (locale === targetLocale) return;

		const nextPath = getLocalizedPath(targetLocale);

		startTransition(() => {
			router.push(nextPath);
		});
	};

	return (
		<li style={{ opacity: isPending ? 0.5 : 1 }}>
			<button
				type="button"
				className={locale === 'ru' ? 'menu__link active-lang' : 'menu__link'}
				style={{ zoom: 0.75 }}
				disabled={isPending}
				onClick={() => handleLocaleSwitch('ru')}>
				RU
			</button>
			<button
				type="button"
				className={locale === 'en' ? 'menu__link active-lang' : 'menu__link'}
				style={{ zoom: 0.75 }}
				disabled={isPending}
				onClick={() => handleLocaleSwitch('en')}>
				EN
			</button>

			{/* <Link
				prefetch={false} // отключить фоновую предзагрузку,
				className={locale === 'ru' ? 'menu__link active-lang' : 'menu__link'}
				style={{ zoom: 0.75 }}
				href={getLocalizedPath('ru')}>
				RU
			</Link>
			<Link
				prefetch={false} // отключить фоновую предзагрузку
				className={locale === 'en' ? 'menu__link active-lang' : 'menu__link'}
				style={{ zoom: 0.75 }}
				href={getLocalizedPath('en')}>
				EN
			</Link> */}
		</li>
	);
}

// 2. Основной экспорт оборачиваем в Suspense
export default function LocaleChangeButtons({ locale }: { locale: Locale }) {
	return (
		<Suspense fallback={null}>
			<LocaleChangeButtonsContent locale={locale} />
		</Suspense>
	);
}
