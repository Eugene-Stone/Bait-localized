import { getCoursesData, getFiltersData } from '@/api/api-server';
import CoursesSidebar from '@/components/courses/CoursesSidebar';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { Metadata } from 'next';
import { Suspense } from 'react';
import CourseListSkeleton from '@/components/courses/CourseListSkeleton';
import CourseListFetcher from '@/components/courses/CourseListFetcher';
import PaginationFetcher from '@/components/courses/PaginationFetcher';
import PaginationSkeleton from '@/components/courses/PaginationSkeleton';

export const dynamic = 'force-dynamic'; // 'force-dynamic' || 'force-static';
// export const revalidate = 60; // Пересборка каждые 60 секунд, работает если выбрано 'force-static'

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const dict = await getDictionary(locale);

	return {
		title: dict.courses.courses,
	};
}

export type TresolvedSearchParams = {
	search?: string;
	sort?: string;
	page?: string;
	direction?: string | string[];
	level?: string | string[];
};

export default async function Courses({
	params,
	searchParams,
}: {
	params: Promise<{ locale: Locale }>;
	searchParams: Promise<TresolvedSearchParams>;
}) {
	const { locale } = await params;
	const resolvedSearchParams = await searchParams;

	const dict = await getDictionary(locale);
	const { directions, levels, allCourses } = await getFiltersData(locale);

	// Запускаем фетчинг (промис)
	const coursesPromise = getCoursesData(locale, resolvedSearchParams);

	return (
		// <Suspense fallback={<Preloader />}></Suspense>

		// При вызове useSearchParams() в клиентском компоненте Next.js может потребовать обернуть этот компонент в <Suspense></Suspense>

		// Если убрать key, React не будет полностью уничтожать старый DOM-дерево компонента во время перехода, а сохранит его до тех пор, пока сервер не пришлет новые данные.

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

					{/* Карточки сбрасываются в скелетон при смене searchParams */}
					<Suspense
						key={JSON.stringify(resolvedSearchParams)}
						fallback={<CourseListSkeleton />}>
						<CourseListFetcher
							localePack={{ locale, dict }}
							coursesPromise={coursesPromise}
						/>
					</Suspense>
				</div>

				{/* Пагинация лежит СНАРУЖИ Suspense карточек. Она НЕ пропадает при смене страниц */}
				<Suspense
					key={JSON.stringify(resolvedSearchParams)}
					fallback={<PaginationSkeleton />}>
					<PaginationFetcher
						localePack={{ locale, dict }}
						coursesPromise={coursesPromise}
					/>
				</Suspense>
			</div>
		</section>
	);
}
