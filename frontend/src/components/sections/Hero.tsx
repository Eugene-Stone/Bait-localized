import { BACKEND_URL } from '@/constants';
import { imageSrcSet } from '@/utils/imageSrcSet';
import RichText from '@/utils/RichText';
import { SectionsHero } from '@backend-types/sectionsHero';
import Image from 'next/image';

type Props = {
	data: SectionsHero;
};

export default function Hero({ data }: Props) {
	const { title, text, image, anchor } = data;

	// const imageFormats = image && imageSrcSet(image);
	// const srcSetString = imageFormats
	// 	?.map((format) => `${BACKEND_URL}${format.url} ${format.width}w`)
	// 	.join(', ');

	const { srcSetString } = imageSrcSet(image);

	return (
		<section id={anchor} className="top-screen bg-color-1">
			<div className="sect-inner">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6">
							<div className="title-sect">
								<h2 className="h1-title">{title}</h2>
							</div>
							<div className="txt-box">
								<RichText>{text}</RichText>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="top-screen-image-box">
								<div className="top-screen-image">
									<picture>
										<source
											srcSet={srcSetString}
											sizes="
												(min-width: 1200px) 625px,
												(min-width: 992px) 476px,
												(min-width: 576px) 400px,
												100vw
											"
										/>

										<Image
											src={BACKEND_URL + image?.url}
											width={image?.width}
											height={image?.height}
											alt={title || 'Hero image'}
											fetchPriority="high"
										/>
									</picture>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
