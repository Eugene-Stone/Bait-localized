import { BACKEND_URL } from '@/constants';
import { defaultLocale, locales } from '@/i18n/config';
import type { MetadataRoute } from 'next';

const LOCALES = locales;
const DEFAULT_LOCALE = defaultLocale;
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	try {
		const res = await fetch(`${BACKEND_URL}/api/strapi-5-sitemap-plugin/sitemap.xml`, {
			next: { revalidate: 3600 },
		});

		if (!res.ok) {
			return [];
		}

		const xmlText = await res.text();
		const urlRegex = /<loc>(.*?)<\/loc>/g;
		const matches = [...xmlText.matchAll(urlRegex)];

		const sitemapEntries: MetadataRoute.Sitemap = [];

		for (const match of matches) {
			const rawUrl = match[1];

			// Получаем чистый pathname без домена (например, /courses/react-...)
			const path = new URL(rawUrl).pathname;

			// Генерируем запись для каждой локали
			for (const locale of LOCALES) {
				// Формируем альтернативные ссылки для поисковика (hreflang)
				const languages: Record<string, string> = {};
				for (const loc of LOCALES) {
					languages[loc] = `${BASE_URL}/${loc}${path}`;
				}

				sitemapEntries.push({
					url: `${BASE_URL}/${locale}${path}`,
					lastModified: new Date(),
					changeFrequency: 'weekly',
					priority: 0.7,
					alternates: {
						languages,
					},
				});
			}
		}

		return sitemapEntries;
	} catch (error) {
		console.error('Error fetching sitemap from Strapi:', error);
		return [];
	}
}
