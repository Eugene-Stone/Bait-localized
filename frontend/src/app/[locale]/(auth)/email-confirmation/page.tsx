import { BACKEND_URL } from '@/constants';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { redirect } from 'next/navigation';

export const dynamic = 'force-static'; // 'force-dynamic' || 'force-static';
// export const revalidate = 60; // Пересборка каждые 60 секунд, работает если выбрано 'force-static'

interface Props {
	params: Promise<{
		locale: Locale;
	}>;
	searchParams: Promise<{
		confirmation?: string;
	}>;
}

export default async function Page({ params, searchParams }: Props) {
	const { confirmation } = await searchParams;

	const { locale } = await params;

	const dict = await getDictionary(locale);

	if (!confirmation) {
		redirect(`/${locale}/login`);
	}

	const response = await fetch(
		`${BACKEND_URL}/api/auth/email-confirmation?confirmation=${confirmation}`,
	);

	if (!response.ok) {
		return (
			<section className="sect-txt">
				<div className="sect-inner">
					<div className="container">
						<div className="title-sect">
							<h2 className="h1-title">
								<span>{dict.auth.confirmationError}</span>
							</h2>
						</div>
					</div>
				</div>
			</section>
		);
	}

	return (
		<>
			{/* Автоматический перенос через 1 секунду на стороне браузера */}
			<meta httpEquiv="refresh" content={`1;url=/${locale}/login`} />

			<section className="sect-txt">
				<div className="sect-inner">
					<div className="container">
						<div className="title-sect">
							<h2 className="h1-title">
								<span>{dict.auth.emailConfirmed}</span>
							</h2>
						</div>
					</div>
				</div>
			</section>
		</>
	);

	// redirect('/login');
}
