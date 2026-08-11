import RichText from '@/utils/RichText';
import { SectionsTextSection } from '@backend-types/sectionsTextSection';

type Props = {
	data: SectionsTextSection;
};
export default function TextSection({ data }: Props) {
	const { title, text, anchor } = data;
	return (
		<section id={anchor} className="sect-txt">
			<div className="sect-inner">
				<div className="container">
					<div className="title-sect">
						<h1 className="h1-title">
							<span>{title}</span>
						</h1>
					</div>
					<div className="txt-box">
						<div className="row justify-content-center">
							<RichText className="col-lg-12">{text}</RichText>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
