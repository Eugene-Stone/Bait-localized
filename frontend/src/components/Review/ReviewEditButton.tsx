'use client';

import { addReviewEditableId } from '@/redux/slices/reviewSlice';
import { useDispatch } from 'react-redux';

type Props = {
	reviewId: string;
};

export default function ReviewEditButton({ reviewId }: Props) {
	const dispatch = useDispatch();

	function editReview(value: string) {
		dispatch(addReviewEditableId(value));
	}

	return (
		<button className="edit" type="button" onClick={() => editReview(reviewId)}>
			Изменить отзыв
		</button>
	);
}
