import { SectionsGallery } from '@backend-types/sectionsGallery';
import GalleryList from './GalleryList';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';

type Props = {
	data: SectionsGallery;
	locale: Locale;
};

export default async function Gallery({ data, locale }: Props) {
	const { title, gallery } = data;
	const dict = await getDictionary(locale);

	return (
		<section id="gallery" className="sect-gallery bg-color-1">
			<div className="sect-inner">
				<div className="container">
					<div className="title-sect">
						<h2 className="h1-title">{title}</h2>
					</div>
				</div>

				{gallery && <GalleryList dict={dict} gallery={gallery} />}
			</div>
		</section>
	);
}
