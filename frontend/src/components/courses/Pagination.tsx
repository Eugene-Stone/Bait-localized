'use client';

import { useOptimistic, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Pagination as PaginationType } from '@/types';
import { Locale } from '@/i18n/config';
import { Dictionary } from '@/i18n/getDictionary';

type Props = {
	locale: Locale;
	dict: Dictionary;
	pagination: PaginationType;
	pageSize: number;
};

export default function PaginationClient({ locale, dict, pagination, pageSize }: Props) {
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();
	const [, startTransition] = useTransition();

	const { page: serverPage, pageCount } = pagination;

	// Оптимистичное состояние: мгновенно меняет подсвеченную страницу до ответа сервера
	const [optimisticPage, setOptimisticPage] = useOptimistic(
		serverPage,
		(_, newPage: number) => newPage,
	);

	function reloadParamsPagination(newPage: number) {
		if (newPage === optimisticPage) return;

		const params = new URLSearchParams(searchParams.toString());
		params.set('page', String(newPage));

		// 1. Мгновенно обновляем UI на клиенте
		startTransition(() => {
			setOptimisticPage(newPage);

			localStorage.setItem(
				'paginationCourse',
				JSON.stringify({ ...pagination, page: newPage }),
			);

			// 2. Отправляем запрос на сервер без блокировки UI
			router.replace(`${pathname}?${params.toString()}`, { scroll: false });

			// // Для пагинации replace
			// router.replace(`${pathname}?${params}`, {
			// 	scroll: false,
			// });

			// Для фильтров push
			// router.push(`${pathname}?${params}`);

			// Анимация
			// startTransition(() => {
			// 	router.replace(`${pathname}?${params}`);
		});
	}

	if (pageCount <= 1) return null;

	return (
		<nav className="nw-pagination" aria-label="Навигация по курсам">
			<button
				className="nw-pagination-item nw-pagination-arrow"
				onClick={() => reloadParamsPagination(optimisticPage - 1)}
				type="button"
				disabled={optimisticPage === 1}
				aria-label="Предыдущая страница">
				‹
			</button>

			{Array.from({ length: pageCount }, (_, i) => {
				const pageNum = i + 1;
				const isActive = pageNum === optimisticPage;

				return (
					<button
						key={pageNum}
						className={`nw-pagination-item ${isActive ? 'nw-pagination-item-active' : ''}`}
						onClick={() => reloadParamsPagination(pageNum)}>
						{pageNum}
					</button>
				);
			})}

			<button
				className="nw-pagination-item nw-pagination-arrow"
				onClick={() => reloadParamsPagination(optimisticPage + 1)}
				type="button"
				disabled={optimisticPage === pageCount}
				aria-label="Следующая страница">
				›
			</button>
		</nav>
	);
}
