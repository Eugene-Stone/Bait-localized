'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
	return (
		<section className="sect-404">
			<div className="container">
				<br />
				<br />
				<br />
				<div className="title-sect center">
					<h1 className="h1-title">Возникли проблемы</h1>

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
	);
}
