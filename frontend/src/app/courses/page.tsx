import { getFiltersData } from '@/api/api-server';
import CourseList from '@/components/courses/CoursesList';
import CoursesSidebar from '@/components/courses/CoursesSidebar';
import Pagination from '@/components/courses/Pagination';
import Preloader from '@/components/layout/Preloader';
import { BACKEND_URL } from '@/constants';
import { Meta } from '@/types';
import { buildQuery } from '@/utils/buildQuery';
import { Course } from '@backend-types/course';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Пересборка каждые 60 секунд

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Наши курсы',
	};
}

async function getPageData(params: {
	search?: string;
	sort?: string;
	page?: string;
	direction?: string | string[];
	level?: string | string[];
}) {
	// console.log(params.level);

	const filtersDirectionActive = Array.isArray(params.direction)
		? params.direction
		: params.direction
			? [params.direction]
			: [];
	const filtersLevelActive = Array.isArray(params.level)
		? params.level
		: params.level
			? [params.level]
			: [];
	const searchQuery = params.search || '';
	const sorting = params.sort || 'createdAt:desc';
	const pageCurrent = params.page || '1';
	const pageSize = 2;

	/* 
	Строка такого вида сохраняется в params
	http://localhost:3000/courses?level=s-nulya&level=prodolzhayushhie

	В таком виде отправляется в бекенд запрос
	http://localhost:1337/api/courses?filters[level][slug][$in][0]=s-nulya&filters[level][slug][$in][1]=prodolzhayushhie
	*/

	const queryPage = buildQuery({
		filters: {
			// Поиск
			// title: {
			// 	$containsi: searchQuery,
			// },

			// Поиск
			...(searchQuery && {
				title: {
					$containsi: searchQuery,
				},
			}),
			// Фильтра
			direction: {
				slug: {
					// Множество фильтров в массиве
					$in: filtersDirectionActive,
				},
			},
			level: {
				slug: {
					// Множество фильтров в массиве
					$in: filtersLevelActive,
				},
			},
		},
		// Сортировка
		sort: [sorting],
		// Пагинация
		pagination: {
			page: pageCurrent,
			pageSize: pageSize,
		},
		populate: '*',
	});

	const response = await fetch(`${BACKEND_URL}/api/courses?${queryPage}`, {
		cache: 'no-store', // Отключение кеша
		// next: { revalidate: 600 },
	});

	if (response.status === 404) {
		notFound();
	}

	if (!response.ok) {
		throw new Error('Failed to fetch page data');
	}

	// return response.json(),

	const dataPage = await response.json();
	// console.log(dataPage.data);

	return {
		dataPage,
		pageSize,
	};
}

export default async function Courses({
	searchParams,
}: {
	searchParams: Promise<{
		search?: string;
		sort?: string;
		page?: string;
		direction?: string | string[];
		level?: string | string[];
	}>;
}) {
	const params = await searchParams;
	const { dataPage, pageSize } = await getPageData(params);
	const { directions, levels, allCourses } = await getFiltersData();
	const { data: courses, meta }: { data: Course[]; meta: Meta } = dataPage;

	// console.log('params', params);
	// console.log(courses);
	// console.log(meta.pagination);

	return (
		// <Suspense fallback={<Preloader />}>
		<section className="nw-blog-section">
			<div className="nw-blog-container">
				<h2 className="nw-auth-title">Наши курсы</h2>

				<div className="nw-blog-grid">
					{/* <Suspense fallback={null}></Suspense> */}
					<CoursesSidebar filters={{ directions, levels, allCourses }} />

					<CourseList courses={courses} />
				</div>

				{/* При вызове useSearchParams() в клиентском компоненте Next.js может потребовать обернуть этот компонент в <Suspense></Suspense> */}
				<Suspense fallback={null}>
					<Pagination pageSize={pageSize} pagination={meta.pagination} />
				</Suspense>
			</div>
		</section>
		// </Suspense>
	);
}
