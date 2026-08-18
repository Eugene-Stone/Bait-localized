'use client';
import { editReview, leaveReview } from '@/api/api-client';
import { BACKEND_URL } from '@/constants';
import { RootState } from '@/redux/store';
import { FormStatus, ReviewDataResponse } from '@/types';
import { User } from '@backend-types/user';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { clearReviewEditableId } from '@/redux/slices/reviewSlice';
import { Locale } from '@/i18n/config';
import { Dictionary } from '@/i18n/getDictionary';

type Props = {
	localePack: {
		locale: Locale;
		dict: Dictionary;
	};
	user: User;
};

type FormValues = {
	title: string;
	rating: number;
	text: string;
};
export default function ReviewForm({ localePack, user }: Props) {
	const [status, setStatus] = useState<FormStatus>();
	const [serverError, setServerError] = useState('');
	const formRef = useRef<HTMLFormElement | null>(null);
	const dispatch = useDispatch();

	const { locale, dict } = localePack;

	const { statusEditableReview, reviewEditableId } = useSelector(
		(state: RootState) => state.reviewReducer,
	);

	const router = useRouter();

	const {
		register,
		handleSubmit,
		reset,

		formState: { errors, isValid, isDirty },
	} = useForm<FormValues>({
		mode: 'onChange',
		defaultValues: {},
	});

	useEffect(() => {
		// Clean up editing state when component unmounts
		return () => {
			dispatch(clearReviewEditableId());
		};
	}, [dispatch]);

	useEffect(() => {
		if (statusEditableReview && formRef.current) {
			formRef.current.scrollIntoView({
				behavior: 'smooth', // Smooth animation
				block: 'start', // Align to top of viewport
			});
		}
	}, [reviewEditableId, statusEditableReview]);

	useEffect(() => {
		async function fetchReviewEditable(reviewId: string | null) {
			if (reviewId === null) return;

			try {
				const response = await fetch(`${BACKEND_URL}/api/reviews/${reviewId}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				});

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.error?.message ?? 'Failed to fetch comment');
				}

				const reviewData: ReviewDataResponse = await response.json();
				const review = reviewData.data || {};

				reset({
					title: review.title,
					rating: review.rating,
					text: review.text,
				});

				return review;
			} catch (error) {
				if (error instanceof Error) {
					console.log(error.message);
				}
			}
		}

		fetchReviewEditable(reviewEditableId);
	}, [reviewEditableId, reset]);

	async function onSubmit(data: FormValues) {
		setServerError('');
		setStatus('loading');

		const reviewData = {
			title: data.title,
			rating: Number(data.rating),
			text: data.text,
			user: user.id!,
		};

		console.log(reviewData);

		if (statusEditableReview) {
			try {
				const response = await editReview(reviewData, reviewEditableId!);

				setStatus('success');
				setTimeout(() => {
					dispatch(clearReviewEditableId());
					reset({
						title: '',
						rating: NaN,
						text: '',
					});

					router.refresh();
					setStatus('idle');
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
				const response = await leaveReview(reviewData);

				setStatus('success');
				setTimeout(() => {
					reset({
						title: '',
						rating: NaN,
						text: '',
					});

					router.refresh();
					setStatus('idle');
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
		<form
			ref={formRef}
			className={
				status === 'loading'
					? 'nw-auth-form nw-review-form sending'
					: 'nw-auth-form nw-review-form'
			}
			onSubmit={handleSubmit(onSubmit)}>
			<h3>{dict.reviews.leaveReview}</h3>
			<div className="nw-auth-group">
				<label className="nw-auth-label" htmlFor="profile-firstname">
					{dict.reviews.verdict}
				</label>
				<input
					{...register('title', {
						required: dict.errors.errorRequired,
					})}
					className="nw-auth-input"
					type="text"
				/>
				{errors.title && (
					<span className="error-field">
						{errors.title?.message || dict.errors.errorMinor}
					</span>
				)}
			</div>
			<div className="nw-auth-group">
				<label className="nw-auth-label" htmlFor="profile-firstname">
					{dict.reviews.grade}
				</label>
				<input
					{...register('rating', {
						required: dict.errors.errorRequired,
						valueAsNumber: true,
					})}
					className="nw-auth-input"
					min={1}
					max={5}
					type="number"
				/>
				{errors.rating && (
					<span className="error-field">
						{errors.rating?.message || dict.errors.errorMinor}
					</span>
				)}
			</div>
			<div className="nw-auth-group">
				<label className="nw-auth-label" htmlFor="profile-firstname">
					{dict.reviews.yourReview}
				</label>
				<textarea
					{...register('text', {
						required: dict.errors.errorRequired,
					})}
					className="nw-auth-input"
					rows={6}
					defaultValue={''}
				/>
				{errors.text && (
					<span className="error-field">
						{errors.text?.message || dict.errors.errorMinor}
					</span>
				)}
			</div>
			<div style={{ display: 'flex', gap: 10 }}>
				<button className="nw-auth-button" type="submit">
					{dict.reviews.leaveReview}
				</button>

				{isDirty && (
					<button
						className="nw-auth-button cancel"
						type="button"
						onClick={() => {
							dispatch(clearReviewEditableId());
							reset({
								title: '',
								rating: NaN,
								text: '',
							});
						}}>
						{dict.reviews.cancel}
					</button>
				)}
			</div>

			{status === 'success' && (
				<p className="success-field">{dict.reviews.reviewUnderModeration}</p>
			)}
			{status === 'error' && <p className="error-field">{dict.reviews.sendErrorOccurred}</p>}
		</form>
	);
}
