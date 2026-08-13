import { Review as ReviewType } from '@backend-types/review';
import './index.scss';
import { User } from '@backend-types/user';
import ReviewDeleteButton from './ReviewDeleteButton';
import ReviewEditButton from './ReviewEditButton';

type Props = {
	user?: User;
	tagName?: React.ElementType;
	review: ReviewType;
};

export default function Review({ tagName = 'div', user, review }: Props) {
	const Tag = tagName;
	const date = new Date(review.createdAt!).toLocaleDateString('uk-UA');

	return (
		<Tag className="review-slide-inner">
			<div className="review-slide-top-line">
				{user && <ReviewDeleteButton id={review.documentId!} />}

				<div className="review-slide-author">{review.user?.username}</div>
				<div className="review-slide-date">{review.isApproved ? date : 'На проверке'}</div>
			</div>
			<div className="review-slide-txt">
				Оценка <strong>{review.rating}</strong>{' '}
				{review.rating === 5 ? 'звезд!!!' : review.rating === 1 ? 'звезда' : 'звезды'}
				<br />
				{review.text}
				{user && (
					<>
						<br />
						<ReviewEditButton reviewId={review.documentId!} />
					</>
				)}
			</div>
		</Tag>
	);
}
