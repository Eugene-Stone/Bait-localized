'use client';

import { Pagination as PaginationType } from '@/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
// import { useCourseOverlayContext } from './CourseOverlayContext';
import { useLoadingContext } from '@/context/LoadingContext';

type Props = {
	pagination: PaginationType;
	pageSize: number;
};

export default function Pagination({ pagination, pageSize }: Props) {
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();
	const { startLoading } = useLoadingContext();

	const { page, pageCount, total } = pagination;

	// console.log(pathname);

	function reloadParamsPagination(value: string) {
		const params = new URLSearchParams(searchParams);

		params.set('page', value);

		// Включаем оверлей мгновенно
		startLoading();

		// Для пагинации replace
		router.replace(`${pathname}?${params}`, {
			scroll: false,
		});

		// Для фильтров push
		// router.push(`${pathname}?${params}`);

		// Анимация
		// startTransition(() => {
		// 	router.replace(`${pathname}?${params}`);
		// });
	}

	function prevPage() {
		if (page > 1) {
			reloadParamsPagination(String(page - 1));
		}
	}
	function nextPage() {
		if (page < pageCount) {
			reloadParamsPagination(String(page + 1));
		}
	}
	function handleCurrent(value: number) {
		reloadParamsPagination(String(value));
	}

	return (
		<nav className="nw-pagination" aria-label="Навигация по курсам">
			<button
				className="nw-pagination-item nw-pagination-arrow"
				onClick={prevPage}
				type="button"
				disabled={page === 1}
				aria-label="Предыдущая страница">
				‹
			</button>

			{pagination &&
				Array.from({ length: pagination?.pageCount }, (_, i) => (
					<button
						key={i}
						className={
							page === i + 1
								? 'nw-pagination-item nw-pagination-item-active'
								: 'nw-pagination-item'
						}
						onClick={() => handleCurrent(i + 1)}>
						{i + 1}
					</button>
				))}

			<button
				className="nw-pagination-item nw-pagination-arrow"
				onClick={nextPage}
				type="button"
				disabled={page === pageCount}
				aria-label="Следующая страница">
				›
			</button>
		</nav>
	);
}
