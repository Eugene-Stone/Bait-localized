import { Metadata } from 'next';
import { getPageBySlug } from '@/api/api-server';
import { SharedSeo } from '@backend-types/sharedSeo';
import { BACKEND_URL, SITE_TITLE } from '@/constants';
import DynamicSections from '@/components/sections/DynamicSections';
import { notFound } from 'next/navigation';
import { Media } from '@backend-types/media';
import { Locale, locales } from '@/i18n/config';

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
	const { locale, slug } = await params;
	if (!locales.includes(locale as Locale)) {
		notFound();
	}

	const dataPage = await getPageBySlug(locale, slug);

	const pageTitle = dataPage.data[0].title;
	const seo: SharedSeo = dataPage?.data[0]?.seo || {};

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
			// locale: 'ru_RU',
			locale: locale === 'ru' ? 'ru_RU' : locale === 'en' ? 'en_EN' : 'ru_RU',
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

	const dataPage = await getPageBySlug(locale, slug);
	const page = dataPage.data?.[0];

	if (!page) {
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
