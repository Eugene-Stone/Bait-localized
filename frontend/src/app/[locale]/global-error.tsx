'use client';

import { SITE_TITLE } from '@/constants';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
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
							<h1 className="h1-title">Сайт временно недоступен</h1>

							{/* <p>{error.message}</p> */}
							<div className="btn-more-wrap center">
								<button
									className="btn"
									onClick={() => {
										window.location.reload();
									}}>
									Попробовать снова
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
