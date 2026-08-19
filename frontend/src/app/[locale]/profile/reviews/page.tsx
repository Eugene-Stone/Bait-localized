import { getMe } from '@/api/api-server';
import Review from '@/components/Review';
import ReviewForm from '@/components/Review/ReviewForm';
import { BACKEND_URL } from '@/constants';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { Review as ReviewType } from '@backend-types/review';
import { User } from '@backend-types/user';
import { redirect } from 'next/navigation';

type Props = {
	params: Promise<{ locale: Locale }>;
};

async function getReviews(userId: number) {
	const response = await fetch(
		`${BACKEND_URL}/api/reviews?filters[user][id][$eq]=${userId}&populate=*`,
		{
			next: { revalidate: 600 },
		},
	);

	if (!response.ok) {
		throw new Error('Failed to fetch');
	}
	return response.json();
}

export default async function Reviews({ params }: Props) {
	const user = await getMe();
	const { locale } = await params;
	const dict = await getDictionary(locale);

	if (!user) {
		redirect(`/${locale}/login`);
	}

	const reviewsData = await getReviews(user.id);
	const reviews: ReviewType[] = reviewsData.data ?? [];

	return (
		<div className="nw-profile-content">
			{reviews.length > 0 ? (
				<>
					<h3 className="nw-comments-title" style={{ marginTop: 0 }}>
						{dict.reviews.yourReviews}
					</h3>
					<ul className="reviews__list">
						{reviews.map((review, i) => {
							return (
								<Review
									key={i}
									localePack={{ locale, dict }}
									tagName="li"
									user={user as User}
									review={review}
								/>
							);
						})}
					</ul>
				</>
			) : (
				<p>{dict.reviews.noReviewsYet}</p>
			)}

			<ReviewForm localePack={{ locale, dict }} user={user as User} />
		</div>
	);
}
