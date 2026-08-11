import { SectionsGallery } from '@backend-types/sectionsGallery';
import GalleryList from './GalleryList';

type Props = {
	data: SectionsGallery;
};

export default function Gallery({ data }: Props) {
	const { title, gallery } = data;

	return (
		<section id="gallery" className="sect-gallery bg-color-1">
			<div className="sect-inner">
				<div className="container">
					<div className="title-sect">
						<h2 className="h1-title">{title}</h2>
					</div>
				</div>

				{gallery && <GalleryList gallery={gallery} />}
			</div>
		</section>
	);
}
