'use client';

import { useEffect, useLayoutEffect, useState } from 'react';
import { Pagination as PaginationType } from '@/types';

const INITIAL_PAGINATION: PaginationType = {
	page: 1,
	pageSize: 2,
	pageCount: 3,
	total: 6,
};

export default function PaginationSkeleton() {
	const [pagination, setPagination] = useState<PaginationType>(INITIAL_PAGINATION);

	useEffect(() => {
		const cached = localStorage.getItem('paginationCourse');
		if (cached) {
			try {
				const parsed = JSON.parse(cached);
				// Выносим из синхронного вызова эффекта
				queueMicrotask(() => {
					setPagination(parsed);
				});
			} catch (error) {
				console.error('Failed to parse cached pagination:', error);
			}
		}
	}, []);

	const { page, pageCount } = pagination;

	return (
		<nav className="nw-pagination is-loading" aria-label="Навигация по курсам">
			<button
				className="nw-pagination-item nw-pagination-arrow"
				type="button"
				disabled={page === 1}
				aria-label="Предыдущая страница">
				‹
			</button>

			{Array.from({ length: pageCount }, (_, i) => (
				<button
					key={i + 1}
					className={
						page === i + 1
							? 'nw-pagination-item nw-pagination-item-active'
							: 'nw-pagination-item'
					}>
					{i + 1}
				</button>
			))}

			<button
				className="nw-pagination-item nw-pagination-arrow"
				type="button"
				disabled={page === pageCount}
				aria-label="Следующая страница">
				›
			</button>
		</nav>
	);
}
