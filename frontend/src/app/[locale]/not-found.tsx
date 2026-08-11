import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Пересборка каждые 60 секунд

export default function NotFound() {
	return (
		<section className="sect-404">
			<div className="container">
				<br />
				<br />
				<br />
				<div className="title-sect center">
					<h1 className="h1-title">404 not found</h1>
					<div className="btn-more-wrap center">
						<Link href="/" className="btn">
							Go to home
						</Link>
					</div>
				</div>
				<br />
				<br />
				<br />
			</div>
		</section>
	);
}
