import type { Metadata } from 'next';
import type { SharedSeo } from '@backend-types/sharedSeo';
import { BACKEND_URL, FRONTEND_URL, SITE_TITLE } from '@/constants';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import RichText from '@/utils/RichText';
import { imageSrcSet } from '@/utils/imageSrcSet';
import Image from 'next/image';
import { formatDate } from '@/utils/formatDate';
import { getMe } from '@/api/api-getMe';
import { getCourseBySlug } from '@/api/api-server';
import Comment from '@/components/Comment';
import CommentForm from '@/components/Comment/CommentForm';
import { Media } from '@backend-types/media';
import { defaultLocale, Locale, locales, ogLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { CourseExtended } from '@/types';

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

	const dataPage = await getCourseBySlug(locale, slug, isDefaultLocale);
	// console.log('dataPage', dataPage);

	// const page = dataPage.data?.[0];
	let page: CourseExtended;
	page = isDefaultLocale
		? dataPage.data?.[0]
		: // eslint-disable-next-line
			dataPage.data?.[0].localizations?.find((loc: any) => loc.locale === locale);

	if (!page && slug === dataPage.data?.[0].slug) {
		page = dataPage.data?.[0];
	} else if (!page) {
		notFound();
	}
	// console.log('page', page);

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

export default async function CourseBySlug({
	params,
}: {
	params: Promise<{ locale: Locale; slug: string }>;
}) {
	const { locale, slug } = await params;
	const user = await getMe();

	const isDefaultLocale = locale === defaultLocale;

	const dataPage = await getCourseBySlug(locale, slug, isDefaultLocale);
	// console.log('dataPage', dataPage);

	const localizationCurrentPage = dataPage.data?.[0].localizations?.find(
		// eslint-disable-next-line
		(loc: any) => loc.locale === locale,
	);

	let page: CourseExtended = isDefaultLocale ? dataPage.data?.[0] : localizationCurrentPage;

	if (!page && slug === dataPage.data?.[0].slug) {
		// page = dataPage.data?.[0];

		const localizationDefaultPage = dataPage.data?.[0].localizations.find(
			// eslint-disable-next-line
			(loc: any) => loc.locale === defaultLocale,
		);

		redirect(`/${locale}/courses/${localizationDefaultPage.slug}`);
	} else if (!page) {
		notFound();
	}

	// console.log('page', page);

	const localizationDefaultComments = page.localizations?.find(
		// eslint-disable-next-line
		(loc: any) => loc.locale === defaultLocale,
	);

	const comments = isDefaultLocale
		? page.comments
		: (localizationDefaultComments?.comments ?? page.comments);

	// console.log('comments', comments);

	const { title, image, text } = page;
	const { srcSetString } = imageSrcSet(page.image);

	const structuredData = page?.seo?.structuredData;

	const dict = await getDictionary(locale);

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

			<section className="nw-blog-section">
				<article className="nw-post-container">
					<header className="nw-post-header">
						<div className="nw-post-meta">
							{dict.courses.published}: {formatDate(locale, page.createdAt!)} •{' '}
							{page.direction?.title}
						</div>
						<h1 className="nw-post-title">{title}</h1>
					</header>
					<div className="nw-post-main-img-wrapper">
						{page.image && (
							<picture>
								<source
									srcSet={srcSetString}
									sizes="
								(min-width: 768px) 718px,
								100vw
							"
								/>
								<Image
									className="nw-post-main-img"
									width={image?.width}
									height={image?.height}
									alt={image?.alternativeText || ''}
									src={BACKEND_URL + image?.url}
								/>
							</picture>
						)}
					</div>

					<RichText className="nw-post-body">{text}</RichText>

					<h3 className="nw-comments-title">{dict.courses.discussion}</h3>
					{comments && (
						<ul className="nw-comments-list">
							{comments.map((comment, i) => {
								if (comment.isApproved) {
									return (
										<Comment
											key={i}
											locale={locale}
											dict={dict}
											user={user}
											comment={comment}
										/>
									);
								}
							})}
						</ul>
					)}

					{user ? (
						<CommentForm locale={locale} dict={dict} user={user} course={page} />
					) : (
						<div className="reviews__leave-notice">
							<p>
								{dict.comments.toAskOrComment}{' '}
								{/* Символ # в query-параметрах отсекается браузером как хэш текущего URL, если его не закодировать. Нужно завернуть значение callbackUrl в encodeURIComponent: */}
								<Link
									href={`/${locale}/login?callbackUrl=${encodeURIComponent(`/${locale}/courses/${slug}#comment-form-area`)}`}>
									{dict.comments.logIn}
								</Link>{' '}
								{dict.comments.or}{' '}
								<Link href={`/${locale}/registration`}>{dict.comments.signUp}</Link>{' '}
								{dict.comments.onSite}
							</p>
						</div>
					)}

					<footer className="nw-post-footer">
						<Link className="nw-post-back-link" href={'/' + locale + '/courses'}>
							← {dict.courses.goBack}
						</Link>
					</footer>
				</article>
			</section>
		</>
	);
}
