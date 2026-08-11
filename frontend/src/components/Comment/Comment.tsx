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

type Props = {
	user?: User;
	comment: CommentType;
};
export default function Comment({ user, comment }: Props) {
	const formattedDate = formatDate(comment.createdAt, 'withTime');

	return (
		<li className="nw-comment-item">
			<div className="nw-comment-meta">
				<span className="nw-comment-author">{comment.user?.username}</span>
				<Link className="nw-comment-course" href={`/courses/${comment.course?.slug}`}>
					<strong>{comment.course?.title}</strong>
				</Link>
				<span className="nw-comment-date">
					{comment.isApproved ? formattedDate : 'На проверке'}
				</span>
			</div>
			<p className="nw-comment-text">{comment.text}</p>

			{comment.user?.username === user?.username && (
				<div className="edit-comment-line">
					<CommentEditButton user={user} comment={comment} />
					<CommentDeleteButton id={comment.documentId!} />
				</div>
			)}
		</li>
	);
}
