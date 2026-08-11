import { getHomePageData } from '@/api/api-server';
import DynamicSections from '@/components/sections/DynamicSections';

import { BACKEND_URL, FRONTEND_URL, SITE_TITLE } from '@/constants';
import HomeDetect from '@/utils/HomeDetect';
import { Media } from '@backend-types/media';
import { SharedSeo } from '@backend-types/sharedSeo';

import { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Пересборка каждые 60 секунд

export async function generateMetadata(): Promise<Metadata> {
	const { responseData: dataPage } = await getHomePageData();

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
		viewport: metaViewport,
		alternates: {
			canonical: canonicalUrl || '/',
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
			locale: 'ru_RU',
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

export default async function Home() {
	const { home, responseData: dataPage } = await getHomePageData();
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
					<DynamicSections sections={sections} />
					// </Suspense>
				)}
			</div>
		</>
	);
}
