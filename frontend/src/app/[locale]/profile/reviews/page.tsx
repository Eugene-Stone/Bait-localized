import { getMe } from '@/api/api-server';
import Review from '@/components/Review';
import ReviewForm from '@/components/Review/ReviewForm';
import { BACKEND_URL } from '@/constants';
import { Review as ReviewType } from '@backend-types/review';
import { User } from '@backend-types/user';
import { redirect } from 'next/navigation';

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

export default async function Reviews() {
	const user = await getMe();

	if (!user) {
		redirect('/login');
	}

	const reviewsData = await getReviews(user.id);
	const reviews: ReviewType[] = reviewsData.data ?? [];

	return (
		<>
			{reviews.length > 0 ? (
				<>
					<h3 className="nw-comments-title" style={{ marginTop: 0 }}>
						Ваши отзывы
					</h3>
					<ul className="reviews__list">
						{reviews.map((review, i) => {
							return (
								<Review key={i} tagName="li" user={user as User} review={review} />
							);
						})}
					</ul>
				</>
			) : (
				<p>
					Ты пока не оставил ни одного отзыва. Запишись на курс, пройди обучение и
					поделись впечатлениями!
				</p>
			)}

			<ReviewForm user={user as User} />
		</>
	);
}
