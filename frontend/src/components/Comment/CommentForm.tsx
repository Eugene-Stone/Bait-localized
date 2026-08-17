'use client';

import { useRouter } from 'next/navigation';

import { editComment, leaveComment } from '@/api/api-client';
import { BACKEND_URL } from '@/constants';
import { RootState } from '@/redux/store';
import { CommentDataResponse, CourseExtended, FormStatus } from '@/types';

import { User } from '@backend-types/user';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { clearCommentEditableId } from '@/redux/slices/commentSlice';
import { defaultLocale, Locale } from '@/i18n/config';

type Props = {
	locale: Locale;
	user: User;
	course: CourseExtended;
	setOpen?: Dispatch<SetStateAction<boolean>>;
};
type FormValues = {
	comment: string;
};
export default function CommentForm({ locale, user, course, setOpen }: Props) {
	const [status, setStatus] = useState<FormStatus>('idle');
	const [serverError, setServerError] = useState('');

	const isDefaultLocale = locale === defaultLocale;

	// const [defaultComment, setDefaultComment] = useState('');
	const dispatch = useDispatch();
	const { statusEditableComment, commentEditableId } = useSelector(
		(state: RootState) => state.commentReducer,
	);

	const router = useRouter();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<FormValues>({
		mode: 'onChange',
		defaultValues: {
			comment: '',
		},
	});

	// eslint-disable-next-line
	const localization = course.localizations?.find((loc: any) => loc.locale === defaultLocale);

	const courseTitle = isDefaultLocale ? course.title : (localization?.title ?? course.title);
	const courseId = isDefaultLocale
		? course.documentId
		: (localization?.documentId ?? course.documentId);

	useEffect(() => {
		async function fetchCommentEditable(commentId: string | null) {
			if (commentId === null) {
				// setDefaultComment('');
				return;
			}

			try {
				const response = await fetch(`${BACKEND_URL}/api/comments/${commentId}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				});

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.error?.message ?? 'Failed to fetch comment');
				}

				const data: CommentDataResponse = await response.json();
				const { data: comment } = data;

				console.log(comment.text);

				// setDefaultComment(comment.text || '');
				reset({
					comment: comment.text || '',
				});

				return comment;
			} catch (error) {
				console.error(error);

				throw new Error('Failed to fetch comment');
			}
		}

		fetchCommentEditable(commentEditableId);
	}, [commentEditableId, reset]);

	async function onSubmit(data: FormValues) {
		setServerError('');
		setStatus('loading');

		const commentData = {
			title: courseTitle || '',
			text: data.comment,
			user: user.id!,
			course: courseId!,
		};
		console.log(commentData);

		if (statusEditableComment) {
			try {
				const response = await editComment(commentData, commentEditableId || '');

				setStatus('success');
				// router.refresh(); // Запрашивает обновленные Server Components у сервера
				setTimeout(() => {
					reset({
						comment: '',
					});

					setOpen?.(false);
					router.refresh(); // Запрашивает обновленные Server Components у сервера
				}, 500);
			} catch (error) {
				if (error instanceof Error) {
					setServerError(error.message);
					console.log(error.message);
				}

				setStatus('error');
			}
		} else {
			try {
				const response = await leaveComment(commentData);

				setStatus('success');
				setTimeout(() => {
					reset({
						comment: '',
					});
				}, 500);
			} catch (error) {
				if (error instanceof Error) {
					setServerError(error.message);
					console.log(error.message);
				}

				setStatus('error');
			}
		}
	}

	return (
		<div id="comment-form-area" className="nw-comments-area">
			<div className="nw-comment-form-wrapper">
				<h4 className="nw-widget-title">Оставить комментарий</h4>
				<form
					className={status === 'loading' ? 'nw-comment-form sending' : 'nw-comment-form'}
					onSubmit={handleSubmit(onSubmit)}>
					<div className="nw-comment-field-group">
						<label className="nw-comment-label" htmlFor="comment-message">
							Ваш комментарий *
						</label>
						<textarea
							{...register('comment', {
								required: 'Перед отправкой заполните поле',
							})}
							className="nw-comment-textarea"
							id="comment-message"
						/>
						{errors.comment && (
							<span className="error-field">
								{errors.comment?.message || 'Возщникла ошибка'}
							</span>
						)}
					</div>
					<div style={{ display: 'flex', gap: 10 }}>
						<button className="nw-comment-submit-button" type="submit">
							Отправить
						</button>
						{isValid && (
							<button
								className="nw-comment-submit-button cancel"
								type="button"
								onClick={() => {
									reset({
										comment: '',
									});
									dispatch(clearCommentEditableId());
									setOpen?.(false);
								}}>
								Отмена
							</button>
						)}
					</div>

					{status === 'success' && (
						<p className="success-field">Ваш отзыв на модерации</p>
					)}
					{status === 'error' && (
						<p className="error-field">Возникла ошибка при отправке</p>
					)}
				</form>
			</div>
		</div>
	);
}
