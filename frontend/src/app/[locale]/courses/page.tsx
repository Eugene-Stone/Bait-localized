import { getFiltersData } from '@/api/api-server';
import CourseList from '@/components/courses/CoursesList';
import CoursesSidebar from '@/components/courses/CoursesSidebar';
import Pagination from '@/components/courses/Pagination';
import Preloader from '@/components/layout/Preloader';
import { BACKEND_URL } from '@/constants';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { CourseExtended, Meta } from '@/types';
import { buildQuery } from '@/utils/buildQuery';
import { Course } from '@backend-types/course';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Пересборка каждые 60 секунд

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
	const { locale } = await params;

	return {
		title: locale === 'ru' ? 'Наши курсы' : locale === 'en' ? 'Our courses' : 'Наши курсы',
	};
}

async function getPageData(
	locale: Locale = 'ru',
	params: {
		search?: string;
		sort?: string;
		page?: string;
		direction?: string | string[];
		level?: string | string[];
	},
) {
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
		// populate: '*',
		populate: {
			seo: {
				populate: {
					ogImage: true,
				},
			},
			image: {
				populate: '*',
			},
			direction: true,
			level: true,
			formats: {
				populate: '*',
			},
			comments: {
				populate: '*',
			},
			localizations: {
				// populate: '*',
				populate: {
					seo: {
						populate: {
							ogImage: true,
						},
					},
					image: {
						populate: '*',
					},
					direction: true,
					level: true,
					formats: {
						populate: '*',
					},
					comments: {
						populate: '*',
					},
				},
			},
		},
	});

	const response = await fetch(`${BACKEND_URL}/api/courses?locale=${locale}&${queryPage}`, {
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
	// console.log(dataPage);

	return {
		dataPage,
		pageSize,
	};
}

export default async function Courses({
	params,
	searchParams,
}: {
	params: Promise<{ locale: Locale }>;
	searchParams: Promise<{
		search?: string;
		sort?: string;
		page?: string;
		direction?: string | string[];
		level?: string | string[];
	}>;
}) {
	const { locale } = await params;
	const resolvedSearchParams = await searchParams;

	const dict = await getDictionary(locale);

	const { dataPage, pageSize } = await getPageData(locale, resolvedSearchParams);
	const { directions, levels, allCourses } = await getFiltersData(locale);
	const { data: courses, meta }: { data: CourseExtended[]; meta: Meta } = dataPage;

	// console.log('params', params);
	// console.log('courses', courses);
	// console.log(meta.pagination);

	return (
		// <Suspense fallback={<Preloader />}>
		<section className="nw-blog-section">
			<div className="nw-blog-container">
				<h2 className="nw-auth-title">{dict.titles.courses}</h2>

				<div className="nw-blog-grid">
					{/* <Suspense fallback={null}></Suspense> */}
					<CoursesSidebar
						locale={locale}
						dict={dict}
						filters={{ directions, levels, allCourses }}
					/>

					<CourseList locale={locale} dict={dict} courses={courses} />
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
