import { getHomePageData } from '@/api/api-server';
import DynamicSections from '@/components/sections/DynamicSections';

import { BACKEND_URL, FRONTEND_URL, SITE_TITLE } from '@/constants';
import { Locale, locales, ogLocale } from '@/i18n/config';
import HomeDetect from '@/utils/HomeDetect';
import { Media } from '@backend-types/media';
import { SharedSeo } from '@backend-types/sharedSeo';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic'; // 'force-dynamic' || 'force-static';
export const revalidate = 60; // Пересборка каждые 60 секунд, работает если выбрано 'force-static'

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
	const { locale } = await params;

	if (!locales.includes(locale as Locale)) {
		notFound();
	}

	const { responseData: dataPage } = await getHomePageData(locale);

	const pageTitle = dataPage?.data?.title;
	const seo: SharedSeo = dataPage?.data?.seo || {};

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
			// canonical: canonicalUrl || '/',
			canonical: `/${locale}`,
			languages: {
				ru: '/ru',
				en: '/en',
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

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
	const { locale } = await params;

	if (!locales.includes(locale as Locale)) {
		notFound();
	}

	const { home, responseData: dataPage } = await getHomePageData(locale);
	const { sections } = dataPage.data;
	const structuredData = dataPage?.data?.seo?.structuredData;

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

			<div data-is-home={home}>
				<HomeDetect />
				{/* {sections && <DynamicSections sections={sections} />} */}
				{sections && (
					// <Suspense fallback={<Preloader />}>
					<DynamicSections locale={locale} sections={sections} />
					// </Suspense>
				)}
			</div>
		</>
	);
}
