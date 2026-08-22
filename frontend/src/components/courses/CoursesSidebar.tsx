'use client';

import { BACKEND_URL } from '@/constants';
import { useLoadingContext } from '@/context/LoadingContext';
import { Locale } from '@/i18n/config';
import { Dictionary, getDictionary } from '@/i18n/getDictionary';
import { Course } from '@backend-types/course';
import { Direction } from '@backend-types/direction';
import { Level } from '@backend-types/level';
import { SharedLocaleField } from '@backend-types/sharedLocaleField';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

type Props = {
	locale: Locale;
	dict: Dictionary;
	filters: {
		directions: Direction[];
		levels: Level[];
		allCourses: Course[];
	};
};

// Каждый клиентский компонент, в котором есть useSearchParams, нужно переписать по следующей схеме — вынести работу с хуком во внутренний подкомпонент и обернуть его в <Suspense>:

// 1. Выносим логику с хуком в отдельный внутренний компонент
function CoursesSidebarContent({ locale, dict, filters }: Props) {
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();
	const { startLoading } = useLoadingContext();

	const { directions, levels, allCourses = [] } = filters;

	const sortList = [
		{
			title: dict.courses.sorting.newFirst,
			value: 'createdAt:desc',
		},
		{
			title: dict.courses.sorting.oldFirst,
			value: 'createdAt:asc',
		},
		{
			title: dict.courses.sorting.cheaperFirst,
			value: 'price:asc',
		},
		{
			title: dict.courses.sorting.expensiveFirst,
			value: 'price:desc',
		},
	];

	// Инициализация состояний из URL
	const [search, setSearch] = useState(searchParams.get('search') || '');
	const sorting = searchParams.get('sort') || sortList[0].value;
	const directionsActive = searchParams.getAll('direction');
	const levelsActive = searchParams.getAll('level');

	// console.log('directions', directions);
	// console.log('levels', levels);

	// Функция обновления URL
	const updateQueryParams = (updates: Record<string, string | string[] | null>) => {
		const params = new URLSearchParams(searchParams.toString());

		// При изменении фильтров сбрасываем страницу на первую
		params.delete('page');

		Object.entries(updates).forEach(([key, value]) => {
			params.delete(key);

			if (Array.isArray(value)) {
				value.forEach((val) => {
					if (val) params.append(key, val);
				});
			} else if (value) {
				params.set(key, value);
			}
		});

		startLoading();
		router.push(`${pathname}?${params.toString()}`, {
			scroll: false,
		});
	};

	// Обработчик чекбоксов
	const handleCheckboxChange = (key: 'direction' | 'level', value: string, checked: boolean) => {
		const currentValues = key === 'direction' ? directionsActive : levelsActive;
		const updatedValues = checked
			? [...currentValues, value]
			: currentValues.filter((item) => item !== value);

		updateQueryParams({ [key]: updatedValues });
	};

	// Обработчик отправки формы поиска
	const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		updateQueryParams({ search: search.trim() || null });
	};

	// 1. Фильтруем курсы по поисковому запросу (если есть)
	const searchFilteredCourses = allCourses.filter((course) => {
		if (!search) return true;
		return course.title?.toLowerCase().includes(search.toLowerCase());
	});

	// 2. Функция подсчета доступных курсов для направления (с учетом выбранных levels)
	const getDirectionCount = (directionSlug: string) => {
		return searchFilteredCourses.filter((course) => {
			const matchesDirection = course.direction?.slug === directionSlug;
			const matchesLevel =
				levelsActive.length === 0 ||
				(course.level?.slug && levelsActive.includes(course.level.slug));

			return matchesDirection && matchesLevel;
		}).length;
	};

	// 3. Функция подсчета доступных курсов для уровня (с учетом выбранных directions)
	const getLevelCount = (levelSlug: string) => {
		return searchFilteredCourses.filter((course) => {
			const matchesLevel = course.level?.slug === levelSlug;
			const matchesDirection =
				directionsActive.length === 0 ||
				(course.direction?.slug && directionsActive.includes(course.direction.slug));

			return matchesLevel && matchesDirection;
		}).length;
	};

	// Проверяем, активен ли хотя бы один фильтр (поиск, направления, уровень или нестиндартная сортировка)
	const hasActiveFilters =
		Boolean(searchParams.get('search')) ||
		directionsActive.length > 0 ||
		levelsActive.length > 0 ||
		Boolean(searchParams.get('sort'));

	// Функция полного сброса
	const handleResetFilters = () => {
		setSearch('');
		startLoading();
		// Переходим на чистый URL без query-параметров
		router.push(pathname, { scroll: false });
	};

	return (
		<aside className="nw-blog-sidebar">
			<div className="nw-widget">
				<h3 className="nw-widget-title">{dict.titles.search}</h3>
				<form className="nw-search-form" onSubmit={handleSearchSubmit}>
					<input
						className="nw-search-input"
						placeholder={dict.courses.searchPlaceholder}
						type="text"
						name="search"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<button className="nw-search-button" type="submit">
						{dict.buttons.search}
					</button>
				</form>
			</div>
			<div className="nw-widget">
				<h3 className="nw-widget-title">{dict.titles.sort}</h3>
				<select
					className="nw-sort-select"
					value={sorting}
					onChange={(e) => updateQueryParams({ sort: e.target.value })}>
					{sortList.map((item, i) => {
						return (
							<option key={i} value={item.value}>
								{item.title}
							</option>
						);
					})}
				</select>
			</div>
			<div className="nw-widget">
				<h3 className="nw-widget-title">{dict.titles.direction}</h3>

				{directions && (
					<ul className="nw-filter-list">
						{directions.map((filter, i) => {
							if (!filter.slug) return null;
							const count = getDirectionCount(filter.slug);

							// Если с текущими фильтрами курсов 0 — можно не рендерить или дизейблить
							// if (count === 0 && !directionsActive.includes(filter.slug)) return null;

							const filterCurrentLocale = filter.translations?.find(
								(loc: SharedLocaleField) => loc.localeKey === locale,
							);

							const filterTitle =
								filter.translations!.length > 0
									? filterCurrentLocale?.localeValue
									: filter.title;

							return (
								<li key={i}>
									<label className="nw-filter-label">
										<input
											className="nw-filter-checkbox"
											type="checkbox"
											value={filter.slug}
											checked={directionsActive.includes(filter.slug!)}
											disabled={
												count === 0 &&
												!directionsActive.includes(filter.slug)
											}
											onChange={(e) =>
												handleCheckboxChange(
													'direction',
													filter.slug!,
													e.target.checked,
												)
											}
										/>
										<span>
											{filterTitle} ({count})
										</span>
									</label>
								</li>
							);
						})}
					</ul>
				)}
			</div>
			<div className="nw-widget">
				<h3 className="nw-widget-title">{dict.titles.level}</h3>

				{levels && (
					<ul className="nw-filter-list">
						{levels.map((filter, i) => {
							if (!filter.slug) return null;
							const count = getLevelCount(filter.slug);

							// Если с текущими фильтрами курсов 0 — можно не рендерить или дизейблить
							// if (count === 0 && !levelsActive.includes(filter.slug)) return null;

							const filterCurrentLocale = filter.translations?.find(
								(loc: SharedLocaleField) => loc.localeKey === locale,
							);

							const filterTitle =
								filter.translations!.length > 0
									? filterCurrentLocale?.localeValue
									: filter.title;

							return (
								<li key={i}>
									<label className="nw-filter-label">
										<input
											className="nw-filter-checkbox"
											type="checkbox"
											value={filter.slug}
											checked={levelsActive.includes(filter.slug!)}
											disabled={
												count === 0 &&
												!directionsActive.includes(filter.slug)
											}
											onChange={(e) =>
												handleCheckboxChange(
													'level',
													filter.slug!,
													e.target.checked,
												)
											}
										/>
										<span>
											{filterTitle} ({count})
										</span>
									</label>
								</li>
							);
						})}
					</ul>
				)}
			</div>

			{hasActiveFilters && (
				<div className="nw-widget">
					<button
						type="button"
						className="btn nw-reset-button"
						onClick={handleResetFilters}>
						{dict.buttons.resetFilters}
					</button>
				</div>
			)}
		</aside>
	);
}

// 2. Основной экспорт оборачиваем в Suspense
export default function CoursesSidebar({ locale, dict, filters }: Props) {
	return (
		<Suspense fallback={null}>
			<CoursesSidebarContent locale={locale} dict={dict} filters={filters} />
		</Suspense>
	);
}
