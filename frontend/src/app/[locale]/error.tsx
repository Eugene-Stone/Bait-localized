'use client';

import { useParams } from 'next/navigation';
import { defaultLocale, Locale, locales } from '@/i18n/config';
import { SITE_TITLE } from '@/constants';

type Props = {
	error: Error;
	reset: () => void;
};
export default function Error({ error, reset }: Props) {
	const params = useParams();

	// Достатем locale из параметров пути (если error.tsx внутри [locale])
	let currentLocale = params?.locale as string;
	const locale: Locale = (currentLocale as Locale) || defaultLocale;

	return (
		<>
			<title>{SITE_TITLE}</title>

			<section className="sect-404">
				<div className="container">
					<br />
					<br />
					<br />
					<div className="title-sect center">
						<h1 className="h1-title">
							{locale === 'en' ? 'Something went wrong' : 'Возникли проблемы'}
						</h1>

						{/* <p>{error.message}</p> */}
						<div className="btn-more-wrap center">
							<button
								className="btn"
								onClick={() => {
									window.location.reload();
								}}>
								{locale === 'en' ? 'Try again' : 'Попробовать снова'}
							</button>
						</div>
					</div>
					<br />
					<br />
					<br />
				</div>
			</section>
		</>
	);
}
