'use client';

import { SITE_TITLE } from '@/constants';
import { defaultLocale, Locale } from '@/i18n/config';
import { useParams } from 'next/navigation';

type Props = {
	error: Error;
	reset: () => void;
};
export default function GlobalError({ error, reset }: Props) {
	const params = useParams();

	// Достатем locale из параметров пути (если error.tsx внутри [locale])
	let currentLocale = params?.locale as string;
	const locale: Locale = (currentLocale as Locale) || defaultLocale;

	return (
		<html>
			<head>
				<title>{SITE_TITLE}</title>
			</head>
			<body>
				<section className="sect-404">
					<div className="container">
						<br />
						<br />
						<br />
						<div className="title-sect center">
							<h1 className="h1-title">
								{locale === 'en'
									? 'The site is temporarily unavailable'
									: 'Сайт временно недоступен'}
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
			</body>
		</html>
	);
}
