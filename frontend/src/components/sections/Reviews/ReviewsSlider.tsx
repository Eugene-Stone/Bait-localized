'use client';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import { Review as ReviewType } from '@backend-types/review';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '@/constants';
import { Meta } from '@/types';
import Review from '@/components/Review';

type Props = {
	reviewsData: {
		data: ReviewType[];
		meta: Meta;
	};
};

export default function ReviewsSlider({ reviewsData }: Props) {
	const { data: reviews } = reviewsData;

	// const [tempData, setTempData] = useState();
	// useEffect(() => {
	// 	async function fetchReviews() {
	// 		try {
	// 			const response = await fetch(`${BACKEND_URL}/api/reviews?populate=*`, {
	// 				method: 'GET',
	// 			});

	// 			if (!response.ok) {
	// 				throw new Error('Failed to fetch home page data');
	// 			}

	// 			// Await the JSON parsing
	// 			const data = await response.json();
	// 			// Pass the resolved data to state
	// 			setTempData(data);
	// 		} catch (error) {
	// 			console.log(error instanceof Error ? error.message : 'Unknown error');
	// 		}
	// 	}

	// 	fetchReviews();
	// }, []);
	// console.log(tempData);

	return (
		<div className="reviews__slider swiper__slider">
			<Swiper
				className="reviews__slider-list"
				modules={[Navigation, Pagination, Scrollbar, Mousewheel]}
				spaceBetween={0}
				slidesPerView={1}
				loop={true}
				scrollbar={{ draggable: true }}
				navigation={{
					prevEl: '.swiper-button-prev',
					nextEl: '.swiper-button-next',
				}}
				// pagination={{
				// 	el: '.swiper-pagination',
				// 	clickable: true,
				// }}
				pagination={false}
				breakpoints={{
					576: {
						slidesPerView: 1,
						spaceBetween: 0,
					},
					768: {
						slidesPerView: 2,
						spaceBetween: 0,
					},
					992: {
						slidesPerView: 3,
						spaceBetween: 0,
					},
				}}
				mousewheel={{
					enabled: true,
					forceToAxis: true,
					sensitivity: 1,
				}}>
				{reviews?.map((review, i) => {
					return (
						<SwiperSlide key={i}>
							<div className="review-slide-itm">
								<Review review={review} />
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>

			<div className="slide-controls">
				<div className="slider-pagination">
					<div className="swiper-pagination" />
				</div>
				<div className="slider-navigation">
					<button
						type="button"
						className="swiper-button swiper-button-prev"
						aria-label="Slide prev"></button>
					<button
						type="button"
						className="swiper-button swiper-button-next"
						aria-label="Slide next"></button>
				</div>
			</div>
		</div>
	);
}
