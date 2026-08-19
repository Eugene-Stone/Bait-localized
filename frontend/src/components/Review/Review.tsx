'use client';
import { Review as ReviewType } from '@backend-types/review';
import './index.scss';
import { User } from '@backend-types/user';
import ReviewDeleteButton from './ReviewDeleteButton';
import ReviewEditButton from './ReviewEditButton';
import { defaultLocale, Locale } from '@/i18n/config';
import { Dictionary, getDictionary } from '@/i18n/getDictionary';
import { usePathname } from 'next/navigation';

type Props = {
	localePack: {
		locale: Locale;
		dict: Dictionary;
	};
	user?: User;
	tagName?: React.ElementType;
	review: ReviewType;
};

export default function Review({ localePack, tagName = 'div', user, review }: Props) {
	const pathname = usePathname();
	const Tag = tagName;
	const date = new Date(review.createdAt!).toLocaleDateString('uk-UA');

	const { locale, dict } = localePack;

	const isDefaultLocale = locale === defaultLocale;

	const localizationCurrentReview = review.translations?.find(
		// eslint-disable-next-line
		(loc: any) => loc.localeKey === locale,
	);

	let reviewCurrentText = isDefaultLocale
		? review.text
		: (localizationCurrentReview?.localeText ?? review.text);

	if (pathname.startsWith(`/${locale}/profile/reviews`)) {
		reviewCurrentText = review.text;
	}

	return (
		<Tag className="review-slide-inner">
			<div className="review-slide-top-line">
				{user && (
					<ReviewDeleteButton id={review.documentId!} localePack={{ locale, dict }}>
						{dict.reviews.deleteReview}
					</ReviewDeleteButton>
				)}

				<div className="review-slide-author">{review.user?.username}</div>
				<div className="review-slide-date">
					{review.isApproved ? date : dict.reviews.underReview}
				</div>
			</div>
			<div className="review-slide-txt">
				{dict.reviews.grade} <strong>{review.rating}</strong>{' '}
				{review.rating === 5
					? `${dict.reviews.stars}!!!`
					: review.rating === 1
						? `${dict.reviews.star}`
						: `${dict.reviews.stars_}`}
				<br />
				{reviewCurrentText}
				{user && (
					<>
						<br />
						<ReviewEditButton reviewId={review.documentId!}>
							{dict.reviews.editReview}
						</ReviewEditButton>
					</>
				)}
			</div>
		</Tag>
	);
}
