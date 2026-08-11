import { SectionsRequest } from '@backend-types/sectionsRequest';
import Form from './Form';

type Props = {
	data: SectionsRequest;
};
export default function Request({ data }: Props) {
	const { title, anchor, form } = data;

	return (
		<section id={anchor} className="sect-request bg-color-2">
			<div className="sect-inner">
				<div className="container">
					<div className="title-sect">
						<h2 className="h1-title">
							<span>{title}</span>
						</h2>
					</div>
					{form && <Form form={form} />}
				</div>
			</div>
		</section>
	);
}
