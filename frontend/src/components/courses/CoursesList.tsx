// components/courses/CourseList.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Course } from '@backend-types/course';
import { BACKEND_URL } from '@/constants';
import { imageSrcSet } from '@/utils/imageSrcSet';

export default function CourseList({ courses }: { courses: Course[] }) {
	return (
		<main className="nw-articles-grid">
			{courses.map((course) => {
				// const imageFormats = course.image && imageSrcSet(course.image);
				// const srcSetString = imageFormats
				// 	?.map((format) => `${BACKEND_URL}${format.url} ${format.width}w`)
				// 	.join(', ');

				const { srcSetString } = imageSrcSet(course.image);

				return (
					<article key={course.slug} className="nw-article-card">
						<Link className="nw-article-img-wrapper" href={`/courses/${course.slug}`}>
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
									{course.price} грн
								</span>
								<span style={{ marginLeft: 12, fontSize: 13 }}>
									• {course.duration} •{' '}
									{course.formats?.map((f) => f.title).join(' / ')}
								</span>
							</div>

							<h3 className="nw-article-card-title">
								<Link href={`/courses/${course.slug}`}>{course.title}</Link>
							</h3>
							<p className="nw-article-excerpt">{course.description}</p>
							<Link className="nw-article-more" href={`/courses/${course.slug}`}>
								Подробнее о курсе
							</Link>
						</div>
					</article>
				);
			})}
		</main>
	);
}
