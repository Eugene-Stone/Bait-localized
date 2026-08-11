import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { BACKEND_URL } from '@/constants';
import { buildQuery } from '@/utils/buildQuery';

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
	},
});

export async function getHomePageData() {
	try {
		const response = await fetch(`${BACKEND_URL}/api/homepage?${queryPage}`, {
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

export async function getPageBySlug(slug: string) {
	let result;

	try {
		console.log(queryPage);
		const response = await fetch(
			`${BACKEND_URL}/api/pages?filters[slug][$eq]=${encodeURIComponent(slug)}&${queryPage}`,
			{
				cache: 'no-store', // Отключение кеша
				// next: { revalidate: 600 },
			},
		);

		if (!response.ok) {
			throw new Error('Failed to fetch home page data');
		}

		result = await response.json();
	} catch (error) {
		console.error(error);
		throw new Error('Backend unavailable');
	}

	// Если бэкенд вернул пустой массив — вызываем 404
	if (!result.data || result.data.length === 0) {
		notFound();
	}
	return result;
}

export async function getCourseBySlug(slug: string) {
	const query = buildQuery({
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
			formats: true,
			comments: {
				populate: '*',
			},
		},
	});

	let result;

	try {
		const response = await fetch(
			// `${BACKEND_URL}/api/courses?filters[slug][$eq]=${slug}&populate[seo][populate][ogImage]=true&populate[image]=true`,
			`${BACKEND_URL}/api/courses?filters[slug][$eq]=${encodeURIComponent(slug)}&${query}`,
			{
				cache: 'no-store', // Отключение кеша
				// next: { revalidate: 600 },
			},
		);

		if (!response.ok) {
			throw new Error('Failed to fetch home page data');
		}

		result = await response.json();
	} catch (error) {
		console.error(error);

		throw new Error('Backend unavailable');
	}

	// Если бэкенд вернул пустой массив — вызываем 404
	if (!result.data || result.data.length === 0) {
		notFound();
	}

	return result;
}

export async function getFooterData() {
	try {
		const response = await fetch(`${BACKEND_URL}/api/footer?populate=*`, {
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

export async function getFooterMenu() {
	try {
		const response = await fetch(
			`${BACKEND_URL}/api/navigation/render/footer-navigation?type=TREE&locale=ru`,
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

export async function getHeaderData() {
	try {
		const response = await fetch(`${BACKEND_URL}/api/header?populate=*`, {
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

export async function getHeaderMenu() {
	try {
		const response = await fetch(
			`${BACKEND_URL}/api/navigation/render/header-navigation?type=TREE&locale=ru`,
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

export async function getFiltersData() {
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
