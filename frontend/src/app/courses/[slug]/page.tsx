import type { Metadata } from 'next';
import type { SharedSeo } from '@backend-types/sharedSeo';
import { BACKEND_URL, SITE_TITLE } from '@/constants';
import DynamicSections from '@/components/sections/DynamicSections';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Course } from '@backend-types/course';
import RichText from '@/utils/RichText';
import { imageSrcSet } from '@/utils/imageSrcSet';
import Image from 'next/image';
import { buildQuery } from '@/utils/buildQuery';
import { formatDate } from '@/utils/formatDate';
import { getMe } from '@/api/api-server';
import { getCourseBySlug } from '@/api/api-server';
import Comment from '@/components/Comment';
import CommentForm from '@/components/Comment/CommentForm';
import { Media } from '@backend-types/media';

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const dataPage = await getCourseBySlug(slug);

	const page = dataPage.data?.[0];

	if (!page) {
		notFound();
	}

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

export default async function CourseBySlug({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const user = await getMe();

	const dataPage = await getCourseBySlug(slug);
	const page: Course = dataPage.data?.[0];

	if (!page) {
		notFound();
	}

	const { title, image, text, comments } = page;
	const { srcSetString } = imageSrcSet(page.image);

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

			<section className="nw-blog-section">
				<article className="nw-post-container">
					<header className="nw-post-header">
						<div className="nw-post-meta">
							Опубликовано: {formatDate(page.createdAt!)} • {page.direction?.title}
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

					<h3 className="nw-comments-title">Обсуждение курса</h3>
					{comments && (
						<ul className="nw-comments-list">
							{comments.map((comment, i) => {
								if (comment.isApproved) {
									return <Comment key={i} user={user} comment={comment} />;
								}
							})}
						</ul>
					)}

					{user ? (
						<CommentForm user={user} course={page} />
					) : (
						<div className="reviews__leave-notice">
							<p>
								Чтобы задать вопрос или оставить комментарий,{' '}
								{/* Символ # в query-параметрах отсекается браузером как хэш текущего URL, если его не закодировать. Нужно завернуть значение callbackUrl в encodeURIComponent: */}
								<Link
									href={`/login?callbackUrl=${encodeURIComponent(`/courses/${slug}#comment-form-area`)}`}>
									авторизируйтесь
								</Link>{' '}
								или <Link href="/registration">зарегистрируйтесь</Link>{' '}
								на&nbsp;сайте.
							</p>
						</div>
					)}

					<footer className="nw-post-footer">
						<Link className="nw-post-back-link" href="/courses">
							← Назад ко всем курсам
						</Link>
					</footer>
				</article>
			</section>
		</>
	);
}
