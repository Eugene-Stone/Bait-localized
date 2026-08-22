import { Metadata } from 'next';
import { getPageBySlug, getAllPageSlugs } from '@/api/api-server';
import { SharedSeo } from '@backend-types/sharedSeo';
import { BACKEND_URL, FRONTEND_URL, SITE_TITLE } from '@/constants';
import DynamicSections from '@/components/sections/DynamicSections';
import { notFound, redirect } from 'next/navigation';
import { Media } from '@backend-types/media';
import { defaultLocale, Locale, locales, ogLocale } from '@/i18n/config';
import { Suspense } from 'react';

// Сборщик выдаст ошибку с указанием конкретной строки и функции, из-за которой страница переводится в Dynamic
// export const dynamic = 'error';

// 1. Set background revalidation interval (3600 sec = 1 hour)
export const revalidate = 3600;

// 2. Allow dynamic generation for newly created CMS pages not built during compile time
export const dynamicParams = true;

// 3. Pre-render static HTML for all existing slugs during build
export async function generateStaticParams() {
	try {
		const paths = await getAllPageSlugs();
		return paths;
	} catch (error) {
		console.error('Failed to generate static params:', error);
		return [];
	}
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
	const { locale, slug } = await params;
	const isDefaultLocale = locale === defaultLocale;

	if (!locales.includes(locale as Locale)) {
		notFound();
	}

	const dataPage = await getPageBySlug(locale, slug, isDefaultLocale);
	// console.log(dataPage);

	// const page = dataPage.data?.[0];
	let page;
	page = isDefaultLocale
		? dataPage.data?.[0]
		: // eslint-disable-next-line
			dataPage.data?.[0].localizations?.find((loc: any) => loc.locale === locale);

	if (!page && slug === dataPage.data?.[0].slug) {
		page = dataPage.data?.[0];
	} else if (!page) {
		notFound();
	}

	const pageTitle = page.title;
	const seo: SharedSeo = page.seo || {};

	const {
		canonicalUrl,
		metaDescription,
		keywords,
		metaTitle,
		metaRobots,
		preventIndexing,
		metaViewport,
		ogTitle,
		ogDescription,
		ogImage,
		ogUrl,
		ogType,
		twitterCard,
		twitterTitle,
		twitterDescription,
		twitterImage,
	} = seo;

	// Логика разбора metaRobots или флага preventIndexing
	const isNoIndex = preventIndexing || metaRobots?.includes('noindex');
	const isNoFollow = metaRobots?.includes('nofollow');

	// Формирование URL для OpenGraph и Twitter изображений
	const resolveImageUrl = (image?: Media | null) => {
		if (!image?.url) return '/images/logo.png';
		return image.url.startsWith('http') ? image.url : `${BACKEND_URL}${image.url}`;
	};

	const ogImageUrl = resolveImageUrl(ogImage);
	const twitterImageUrl = resolveImageUrl(twitterImage || ogImage);

	return {
		title: metaTitle || pageTitle,
		description: metaDescription,
		keywords: keywords,
		// viewport: metaViewport,
		alternates: {
			// canonical: canonicalUrl || `${FRONTEND_URL}/${locale}/courses/${slug}`,
			canonical: `${FRONTEND_URL}/${locale}/courses/${slug}`,
			languages: {
				ru: `/ru/courses/${slug}`,
				en: `/en/courses/${slug}`,
				'x-default': `/${defaultLocale}/courses/${slug}`,
			},
		},
		robots: {
			index: !isNoIndex,
			follow: !isNoFollow,
		},
		openGraph: {
			title: ogTitle || metaTitle || pageTitle,
			description: ogDescription || metaDescription,
			url: ogUrl || canonicalUrl || '/',
			siteName: SITE_TITLE,
			// eslint-disable-next-line
			type: (ogType as any) || 'website',
			// locale: 'ru_RU',
			locale: ogLocale(locale),
			images: [
				{
					url: ogImageUrl,
					width: ogImage?.width || 1200,
					height: ogImage?.height || 630,
					alt: ogImage?.alternativeText || ogTitle || metaTitle || pageTitle,
				},
			],
		},
		twitter: {
			card: twitterCard || 'summary_large_image',
			title: twitterTitle || ogTitle || metaTitle || pageTitle,
			description: twitterDescription || ogDescription || metaDescription,
			images: [twitterImageUrl],
		},
	};
}

export default async function PageBySlug({
	params,
}: {
	params: Promise<{ locale: Locale; slug: string }>;
}) {
	const { locale, slug } = await params;

	const isDefaultLocale = locale === defaultLocale;

	const dataPage = await getPageBySlug(locale, slug, isDefaultLocale);

	let page;

	try {
		const localizationCurrentPage = dataPage.data?.[0].localizations?.find(
			// eslint-disable-next-line
			(loc: any) => loc.locale === locale,
		);

		page = isDefaultLocale ? dataPage.data?.[0] : localizationCurrentPage;

		if (!page && slug === dataPage.data?.[0].slug) {
			// page = dataPage.data?.[0];

			const localizationDefaultPage = dataPage.data?.[0].localizations.find(
				// eslint-disable-next-line
				(loc: any) => loc.locale === defaultLocale,
			);

			redirect(`/${locale}/${localizationDefaultPage.slug}`);
		} else if (!page) {
			notFound();
		}
	} catch (error) {
		notFound();
	}

	const { sections } = page;
	const structuredData = page?.seo?.structuredData;

	return (
		<>
			{structuredData && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: structuredData.replace(/</g, '\\u003c'), // Защита от XSS
					}}
				/>
			)}
			{sections && <DynamicSections locale={locale} sections={sections} />}
		</>
	);
}
