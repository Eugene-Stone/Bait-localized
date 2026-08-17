import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { BACKEND_URL } from '@/constants';
import { buildQuery } from '@/utils/buildQuery';
import { defaultLocale, Locale } from '@/i18n/config';

export async function getMe() {
	const cookieStore = await cookies();
	const token = cookieStore.get('jwt')?.value;

	if (!token) {
		return null;
	}

	try {
		const response = await fetch(`${BACKEND_URL}/api/users/me?populate=*`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			cache: 'no-store', // Отключаем fetch-кэш
		});

		if (!response.ok) {
			return null;
		}

		return await response.json();
	} catch (error) {
		console.error('Failed to fetch user:', error);
		return null;
	}
}

// Page sections populate
const queryPage = buildQuery({
	populate: {
		seo: {
			populate: {
				ogImage: true,
			},
		},
		sections: {
			on: {
				'sections.about': { populate: '*' },
				'sections.gallery': {
					populate: {
						gallery: {
							populate: {
								images: true,
							},
						},
					},
				},
				'sections.hero': { populate: '*' },
				'sections.request': {
					populate: {
						form: {
							populate: {
								fields: {
									on: {
										'forms.form-checkboxes': { populate: '*' },
										'forms.form-input': { populate: '*' },
										'forms.form-select': { populate: '*' },
										'forms.form-submit': { populate: '*' },
										'forms.form-textarea': { populate: '*' },
										'forms.form-agree': { populate: '*' },
									},
								},
							},
						},
					},
				},
				'sections.reviews': {
					populate: '*',
				},
				'sections.schedule': { populate: '*' },
				'sections.service': { populate: '*' },
				'sections.text-section': { populate: '*' },
			},
		},
		localizations: {
			populate: {
				seo: {
					populate: {
						ogImage: true,
					},
				},
				sections: {
					on: {
						'sections.about': { populate: '*' },
						'sections.gallery': {
							populate: {
								gallery: {
									populate: {
										images: true,
									},
								},
							},
						},
						'sections.hero': { populate: '*' },
						'sections.request': {
							populate: {
								form: {
									populate: {
										fields: {
											on: {
												'forms.form-checkboxes': { populate: '*' },
												'forms.form-input': { populate: '*' },
												'forms.form-select': { populate: '*' },
												'forms.form-submit': { populate: '*' },
												'forms.form-textarea': { populate: '*' },
												'forms.form-agree': { populate: '*' },
											},
										},
									},
								},
							},
						},
						'sections.reviews': {
							populate: '*',
						},
						'sections.schedule': { populate: '*' },
						'sections.service': { populate: '*' },
						'sections.text-section': { populate: '*' },
					},
				},
			},
		},
	},
});

export async function getHomePageData(locale: Locale | null = 'ru') {
	try {
		const response = await fetch(`${BACKEND_URL}/api/homepage?locale=${locale}&${queryPage}`, {
			// cache: 'no-store', // Отключение кеша
			next: { revalidate: 600 },
		});

		if (response.status === 404) {
			notFound();
		}

		if (!response.ok) {
			throw new Error('Failed to fetch home page data');
		}

		const home = true;
		const responseData = await response.json();
		// return response.json();

		return { home, responseData };
	} catch (error) {
		console.error(error);

		throw new Error('Backend unavailable');
	}
}

// export async function getPageBySlug(
// 	locale: Locale | null = 'ru',
// 	slug: string,
// 	isDefaultLocale: boolean,
// ) {
// 	let result;
// 	const fetchLink = isDefaultLocale
// 		? `${BACKEND_URL}/api/pages?locale=${locale}&filters[slug][$eq]=${encodeURIComponent(slug)}&${queryPage}`
// 		: `${BACKEND_URL}/api/pages?locale=${defaultLocale}&filters[slug][$eq]=${encodeURIComponent(slug)}&${queryPage}`;

// 	try {
// 		// console.log(queryPage);
// 		// console.log('locale', locale);
// 		// console.log('slug', slug);
// 		const response = await fetch(fetchLink, {
// 			cache: 'no-store', // Отключение кеша
// 			// next: { revalidate: 600 },
// 		});

// 		if (!response.ok) {
// 			throw new Error('Failed to fetch page data');
// 		}

// 		result = await response.json();
// 	} catch (error) {
// 		console.error(error);
// 		throw new Error('Backend unavailable');
// 	}

// 	// Если бэкенд вернул пустой массив — вызываем 404
// 	if (!result.data || result.data.length === 0) {
// 		notFound();
// 	}
// 	return result;
// }

async function fetchPageData(url: string) {
	try {
		const response = await fetch(url, {
			cache: 'no-store', // Отключение кеша
			// next: { revalidate: 600 },
		});

		if (!response.ok) {
			throw new Error('Failed to fetch page data');
		}

		return await response.json();
	} catch (error) {
		console.error(error);
		throw new Error('Backend unavailable');
	}
}

export async function getPageBySlug(
	locale: Locale | null = 'ru',
	slug: string,
	isDefaultLocale: boolean,
) {
	const encodedSlug = encodeURIComponent(slug);

	const initialUrl = isDefaultLocale
		? `${BACKEND_URL}/api/pages?locale=${locale}&filters[slug][$eq]=${encodedSlug}&${queryPage}`
		: `${BACKEND_URL}/api/pages?locale=${defaultLocale}&filters[slug][$eq]=${encodedSlug}&${queryPage}`;

	const fallbackUrl = `${BACKEND_URL}/api/pages?locale=${locale}&filters[slug][$eq]=${encodedSlug}&${queryPage}`;

	let result = await fetchPageData(initialUrl);

	// Если результат пустой и урлы отличаются — пробуем запрос с locale
	if ((!result?.data || result.data.length === 0) && initialUrl !== fallbackUrl) {
		result = await fetchPageData(fallbackUrl);
	}

	// Если после попыток данные так и не найдены — вызов 404
	if (!result?.data || result.data.length === 0) {
		notFound();
	}

	return result;
}

export async function getCourseBySlug(
	locale: Locale | null = 'ru',
	slug: string,
	isDefaultLocale: boolean,
) {
	// console.log('isDefaultLocale', isDefaultLocale);

	const queryCourse = buildQuery({
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
			},
		},
	});

	const encodedSlug = encodeURIComponent(slug);

	const initialUrl = isDefaultLocale
		? `${BACKEND_URL}/api/courses?locale=${locale}&filters[slug][$eq]=${encodedSlug}&${queryCourse}`
		: `${BACKEND_URL}/api/courses?locale=${defaultLocale}&filters[slug][$eq]=${encodedSlug}&${queryCourse}`;

	const fallbackUrl = `${BACKEND_URL}/api/courses?locale=${locale}&filters[slug][$eq]=${encodedSlug}&${queryCourse}`;

	let result = await fetchPageData(initialUrl);

	// Если результат пустой и урлы отличаются — пробуем запрос с locale
	if ((!result?.data || result.data.length === 0) && initialUrl !== fallbackUrl) {
		result = await fetchPageData(fallbackUrl);
	}

	// Если после попыток данные так и не найдены — вызов 404
	if (!result?.data || result.data.length === 0) {
		notFound();
	}

	return result;
}

export async function getHeaderData(locale: Locale | null = 'ru') {
	try {
		const response = await fetch(`${BACKEND_URL}/api/header?locale=${locale}&populate=*`, {
			next: { revalidate: 600 },
		});

		if (!response.ok) {
			throw new Error('Failed to fetch home page data');
		}

		return response.json();
	} catch (error) {
		console.error(error);

		throw new Error('Backend unavailable');
	}
}

export async function getHeaderMenu(locale: Locale | null = 'ru') {
	try {
		const response = await fetch(
			// `${BACKEND_URL}/api/navigation/render/header-navigation?type=TREE&locale=${locale}`,
			`${BACKEND_URL}/api/navigation/render/header-navigation?locale=${locale}&type=TREE&populate=*`,
			{
				next: { revalidate: 600 },
			},
		);
		if (!response.ok) {
			throw new Error('Failed to fetch home page data');
		}

		return response.json();
	} catch (error) {
		console.error(error);

		throw new Error('Backend unavailable');
	}
}

export async function getFooterData(locale: Locale | null = 'ru') {
	try {
		const response = await fetch(`${BACKEND_URL}/api/footer?locale=${locale}&populate=*`, {
			next: { revalidate: 600 },
		});

		if (!response.ok) {
			throw new Error('Failed to fetch home page data');
		}

		return response.json();
	} catch (error) {
		console.error(error);

		throw new Error('Backend unavailable');
	}
}

export async function getFooterMenu(locale: Locale | null = 'ru') {
	try {
		const response = await fetch(
			// `${BACKEND_URL}/api/navigation/render/footer-navigation?type=TREE&locale=${locale}`,
			`${BACKEND_URL}/api/navigation/render/footer-navigation?locale=${locale}&type=TREE&populate=*`,
			{
				next: { revalidate: 600 },
			},
		);
		if (!response.ok) {
			throw new Error('Failed to fetch home page data');
		}

		return response.json();
	} catch (error) {
		console.error(error);

		throw new Error('Backend unavailable');
	}
}

export async function getFiltersData(locale: Locale | null = 'ru') {
	try {
		const headers = { 'Content-Type': 'application/json' };
		const [directionsRes, levelsRes, allCoursesRes] = await Promise.all([
			fetch(`${BACKEND_URL}/api/directions?populate=*`, { headers }),
			fetch(`${BACKEND_URL}/api/levels?populate=*`, { headers }),

			// Запрашиваем все курсы (без пагинации) только с нужными полями для подсчета
			fetch(
				`${BACKEND_URL}/api/courses?populate[direction][fields][0]=slug&populate[level][fields][0]=slug&pagination[limit]=1000`,
				{ headers },
			),
		]);

		if (!directionsRes.ok || !levelsRes.ok || !allCoursesRes.ok) {
			throw new Error('Failed to get filters');
		}

		const [directionsData, levelsData, allCoursesData] = await Promise.all([
			directionsRes.json(),
			levelsRes.json(),
			allCoursesRes.json(),
		]);

		return {
			directions: directionsData.data,
			levels: levelsData.data,
			allCourses: allCoursesData.data,
		};
	} catch (error) {
		console.error(error);

		throw new Error('Backend unavailable');
	}
}
