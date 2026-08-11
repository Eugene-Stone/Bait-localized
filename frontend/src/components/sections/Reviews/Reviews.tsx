import { SectionsReviews } from '@backend-types/sectionsReviews';
import ReviewsSlider from './ReviewsSlider';
import './index.scss';
import { BACKEND_URL } from '@/constants';

type Props = {
	data: SectionsReviews;
};

export async function getReviewsData() {
	const response = await fetch(`${BACKEND_URL}/api/reviews?populate=*`, {
		next: { revalidate: 600 },
	});

	if (!response.ok) {
		throw new Error('Failed to fetch home page data');
	}

	return response.json();
}

export default async function Reviews({ data }: Props) {
	const { anchor, title } = data;
	const reviewsData = await getReviewsData();

	return (
		<section id={anchor} className="sect-reviews">
			<div className="container">
				<div className="title-sect">
					<h2 className="h1-title">
						<span>{title}</span>
					</h2>
				</div>
			</div>

			<ReviewsSlider reviewsData={reviewsData} />
		</section>
	);
}
