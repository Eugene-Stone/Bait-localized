import { BACKEND_URL } from '@/constants';
import { imageSrcSet } from '@/utils/imageSrcSet';
import RichText from '@/utils/RichText';
import { SectionsAbout } from '@backend-types/sectionsAbout';
import Image from 'next/image';

type Props = {
	data: SectionsAbout;
};

export default function About({ data }: Props) {
	const { title, text, image, anchor } = data;

	// const imageFormats = image && imageSrcSet(image);
	// const srcSetString = imageFormats
	// 	?.map((format) => `${BACKEND_URL}${format.url} ${format.width}w`)
	// 	.join(', ');

	const { srcSetString } = imageSrcSet(image);

	return (
		<section id={anchor} className="sect-txt bg-color-1">
			<div className="sect-inner">
				<div className="container">
					<div className="title-sect">
						<h2 className="h1-title">
							<span>{title}</span>
						</h2>
					</div>
					<div className="txt-box color-dark">
						<div className="row justify-content-center">
							<div className="col-lg-6">
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
									/>
								</picture>
							</div>
							<RichText className="col-lg-6">{text}</RichText>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
