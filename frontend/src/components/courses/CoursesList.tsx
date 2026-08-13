// components/courses/CourseList.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Course } from '@backend-types/course';
import { BACKEND_URL } from '@/constants';
import { imageSrcSet } from '@/utils/imageSrcSet';
import { defaultLocale, Locale } from '@/i18n/config';
import { Dictionary } from '@/i18n/getDictionary';
import { CourseExtended } from '@/types';

type Props = {
	locale: Locale;
	dict: Dictionary;
	courses: CourseExtended[];
};
export default function CourseList({ locale, dict, courses }: Props) {
	return (
		<main className="nw-articles-grid">
			{courses.map((course) => {
				const { srcSetString } = imageSrcSet(course.image);

				const isDefaultLocale = course.locale === defaultLocale;

				// const localizedDefaultItem = course.localizations?.find(
				// 	(item) => item.locale === defaultLocale,
				// );
				// console.log(course);

				const defaultLocaleSlug = course.localizations?.find(
					(item) => item.locale === defaultLocale,
				)?.slug;

				const linkHref = isDefaultLocale
					? `/${locale}/courses/${course.slug}`
					: // : `/${locale}/courses/${localizedDefaultItem?.slug}`;
						`/${locale}/courses/${defaultLocaleSlug}`;

				return (
					<article key={course.slug} className="nw-article-card">
						<Link className="nw-article-img-wrapper" href={linkHref}>
							<picture>
								{srcSetString && (
									<source
										srcSet={srcSetString}
										sizes="(min-width: 1200px) 420px, (min-width: 992px) 33vw, 50vw"
									/>
								)}
								{course.image && (
									<Image
										className="nw-article-img"
										alt={course.title || ''}
										width={course.image.width}
										height={course.image.height}
										src={`${BACKEND_URL}${course.image.url}`}
									/>
								)}
							</picture>
						</Link>

						<div className="nw-article-content">
							<div className="nw-article-meta" style={{ marginTop: 12 }}>
								<span
									style={{
										color: '#000',
										background: '#FFD700',
										padding: '4px 8px',
										fontWeight: 900,
										fontSize: 16,
									}}>
									{course.price} {dict.courses.currency}
								</span>
								<span style={{ marginLeft: 12, fontSize: 13 }}>
									• {course.duration} •{' '}
									{course.formats?.map((f) => f.title).join(' / ')}
								</span>
							</div>

							<h3 className="nw-article-card-title">
								<Link href={`/${locale}/courses/${course.slug}`}>
									{course.title}
								</Link>
							</h3>
							<p className="nw-article-excerpt">{course.description}</p>
							<Link
								className="nw-article-more"
								href={`/${locale}/courses/${course.slug}`}>
								{dict.courses.readMore}
							</Link>
						</div>
					</article>
				);
			})}
		</main>
	);
}
