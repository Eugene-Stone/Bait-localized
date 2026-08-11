'use client';

import { useState } from 'react';

import Lightbox from 'yet-another-react-lightbox';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import Captions from 'yet-another-react-lightbox/plugins/captions';

import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/counter.css';
// import 'yet-another-react-lightbox/plugins/captions.css';

import { BACKEND_URL } from '@/constants';
import { imageSrcSet } from '@/utils/imageSrcSet';
import { Gallery } from '@backend-types/gallery';
import Image from 'next/image';

type Props = {
	gallery: Gallery;
};

const IMAGES_PER_CLICK = 3;

export default function GalleryList({ gallery }: Props) {
	const { images } = gallery;

	const [visibleCount, setVisibleCount] = useState(IMAGES_PER_CLICK);
	const visibleImages = images?.slice(0, visibleCount);

	const [indexShowing, setIndexShowing] = useState(-1);
	const slidesLightbox = visibleImages?.map((img, i) => {
		return {
			src: BACKEND_URL + img.url,
			// title: 'Slide title',
			description: img.alternativeText,
		};
	});

	return (
		images && (
			<div className="container-fluid">
				<div className="gallery-box masonry-box">
					<div className="gallery-lst masonry-lst">
						{visibleImages?.map((image, i) => {
							// const imageFormats = imageSrcSet(image);

							// const srcSetString = imageFormats
							// 	?.map((format) => `${BACKEND_URL}${format.url} ${format.width}w`)
							// 	.join(', ');

							const { srcSetString } = imageSrcSet(image);

							return (
								<div key={i} className="gallery-itm masonry-itm">
									<span className="gallery-itm-lnk">
										<picture>
											<source
												srcSet={srcSetString}
												sizes="
													(min-width: 992px) 33vw,
													50vw
												"
											/>
											<Image
												className="main-img"
												alt={image.alternativeText}
												width={image.width}
												height={image.height}
												src={BACKEND_URL + image.url}
												onClick={() => setIndexShowing(i)}
											/>
										</picture>
									</span>
								</div>
							);
						})}
					</div>

					{slidesLightbox && (
						<Lightbox
							index={indexShowing}
							slides={slidesLightbox}
							open={indexShowing >= 0}
							close={() => setIndexShowing(-1)}
							plugins={[Counter, Captions]}
						/>
					)}
				</div>

				{visibleCount < images.length && (
					<div className="btn-more-wrap">
						<button
							className="btn"
							onClick={() =>
								setVisibleCount((prevCount) => prevCount + IMAGES_PER_CLICK)
							}>
							Показать больше
						</button>
					</div>
				)}
			</div>
		)
	);
}
