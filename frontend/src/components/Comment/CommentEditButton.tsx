'use client';

import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';

import { Comment } from '@backend-types/comment';
import { CommentExtended, CourseExtended } from '@/types';

import { addCommentEditableId } from '@/redux/slices/commentSlice';
import Modal from '../Modal';
import { usePathname } from 'next/navigation';
import CommentForm from './CommentForm';
import { User } from '@backend-types/user';

import { clearCommentEditableId } from '@/redux/slices/commentSlice';
import { useState } from 'react';
import { Locale } from '@/i18n/config';
import { Dictionary } from '@/i18n/getDictionary';

type Props = {
	localePack: {
		locale: Locale;
		dict: Dictionary;
	};
	user?: User;
	comment: CommentExtended;
	children: React.ReactNode;
};
export default function CommentEditButton({ localePack, user, comment, children }: Props) {
	const { locale, dict } = localePack;
	const pathname = usePathname();

	const dispatch = useDispatch();
	// dispatch(clearCommentEditableId());

	// const { commentEditableId } = useSelector((state: RootState) => state.commentReducer);

	// console.log('commentEditableId', commentEditableId);
	// console.log('comment', comment);
	// console.log('user', user);
	// console.log('course', course);

	function editComment(value: string) {
		dispatch(addCommentEditableId(value));
	}

	const [open, setOpen] = useState(false);

	return (
		<div className="edit">
			{pathname.startsWith(`/${locale}/profile/comments`) ? (
				<Modal
					title=""
					trigger={
						<button
							className="edit-btn"
							onClick={() => editComment(comment.documentId || '1')}>
							{children}
						</button>
					}
					open={open}
					onOpenChange={(value) => {
						setOpen(value);
						if (!value) {
							dispatch(clearCommentEditableId());
						}
					}}>
					{user && (
						<CommentForm
							locale={locale}
							dict={dict}
							user={user}
							course={comment.course! as CourseExtended}
							setOpen={setOpen}
						/>
					)}
				</Modal>
			) : (
				<button className="edit-btn" onClick={() => editComment(comment.documentId || '1')}>
					{children}
				</button>
			)}
		</div>
	);
}
