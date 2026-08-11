import RichText from '@/utils/RichText';
import { SectionsSchedule } from '@backend-types/sectionsSchedule';

type Props = {
	data: SectionsSchedule;
};
export default function Schedule({ data }: Props) {
	const { title, leftText, rightText, anchor } = data;
	return (
		<section id={anchor} className="sect-txt bg-color-3">
			<div className="sect-inner">
				<div className="container">
					<div className="title-sect">
						<h2 className="h1-title">
							<span>{title}</span>
						</h2>
					</div>
					<div className="txt-box color-dark">
						<div className="row justify-content-center">
							<RichText className="col-lg-6">{leftText}</RichText>
							<RichText className="col-lg-6">{rightText}</RichText>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
