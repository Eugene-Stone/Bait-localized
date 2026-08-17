import { formatDate } from '@/utils/formatDate';
import { Comment as CommentType } from '@backend-types/comment';
import CommentEditButton from './CommentEditButton';
import { User } from '@backend-types/user';
import Modal from '../Modal';
import { Course } from '@backend-types/course';
import { CourseExtended } from '@/types';
import { deleteComment } from '@/api/api-client';
import CommentDeleteButton from './CommentDeleteButton';
import Link from 'next/link';
import { BACKEND_URL } from '@/constants';
import { defaultLocale, Locale } from '@/i18n/config';
import { Dictionary } from '@/i18n/getDictionary';

type Props = {
	locale: Locale;
	dict: Dictionary;
	user?: User;
	comment: CommentType;
};
export default function Comment({ locale, dict, user, comment }: Props) {
	// const locale = 'en';
	const isDefaultLocale = locale === defaultLocale;

	const formattedDate = formatDate(locale, comment.createdAt, 'withTime');

	const localizationCurrentComment = comment.translations?.find(
		// eslint-disable-next-line
		(loc: any) => loc.localeKey === locale,
	);

	const commentCurrentText = isDefaultLocale
		? comment.text
		: (localizationCurrentComment?.localeValue ?? comment.text);

	return (
		<li className="nw-comment-item">
			<div className="nw-comment-meta">
				<span className="nw-comment-author">{comment.user?.username}</span>
				<Link
					className="nw-comment-course"
					href={`/${locale}/courses/${comment.course?.slug}`}>
					<strong>{comment.course?.title}</strong>
				</Link>
				<span className="nw-comment-date">
					{comment.isApproved ? formattedDate : 'На проверке'}
				</span>
			</div>
			<p className="nw-comment-text">{commentCurrentText}</p>

			{comment.user?.username === user?.username && (
				<div className="edit-comment-line">
					<CommentEditButton user={user} comment={comment}>
						{dict.comments.edit}
					</CommentEditButton>
					<CommentDeleteButton locale={locale} dict={dict} id={comment.documentId!}>
						{dict.comments.delete}
					</CommentDeleteButton>
				</div>
			)}
		</li>
	);
}
