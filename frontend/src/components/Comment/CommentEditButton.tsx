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

type Props = {
	user?: User;
	comment: CommentExtended;
};
export default function CommentEditButton({ user, comment }: Props) {
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
			{pathname.startsWith('/profile/comments') ? (
				<Modal
					title="Изменить коментарий"
					trigger={
						<button
							className="edit-btn"
							onClick={() => editComment(comment.documentId || '1')}>
							Изменить
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
							user={user}
							course={comment.course! as CourseExtended}
							setOpen={setOpen}
						/>
					)}
				</Modal>
			) : (
				<button className="edit-btn" onClick={() => editComment(comment.documentId || '1')}>
					Изменить
				</button>
			)}
		</div>
	);
}
