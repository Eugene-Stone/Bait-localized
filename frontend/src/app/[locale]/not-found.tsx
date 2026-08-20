import { defaultLocale, Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { cookies } from 'next/headers';
import Link from 'next/link';

export const dynamic = 'force-static'; // 'force-dynamic' || 'force-static';
// export const revalidate = 60; // Пересборка каждые 60 секунд, работает если выбрано 'force-static'

export default async function NotFound() {
	// Получаем локаль из кук, сформированных в middleware (proxy)
	const cookieStore = await cookies();
	const localeCookie = cookieStore.get('NEXT_LOCALE')?.value;

	const locale: Locale = (localeCookie as Locale) || defaultLocale;
	const dict = await getDictionary(locale);

	return (
		<section className="sect-404">
			<div className="container">
				<br />
				<br />
				<br />
				<div className="title-sect center">
					<h1 className="h1-title">{dict.errors.notFound}</h1>
					<div className="btn-more-wrap center">
						<Link href={`/${locale}/`} className="btn">
							{dict.errors.goToHome}
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
