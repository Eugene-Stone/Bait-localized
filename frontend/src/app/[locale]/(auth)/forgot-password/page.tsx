import { Locale } from '@/i18n/config';
import ForgotPasswordForm from './ForgotPasswordForm';
import { getDictionary } from '@/i18n/getDictionary';
import { getMe } from '@/api/api-server';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic'; // 'force-dynamic' || 'force-static';
export const revalidate = 60; // Пересборка каждые 60 секунд

type Props = {
	params: Promise<{ locale: Locale; slug: string }>;
};

export default async function ForgotPassword({ params }: Props) {
	const { locale } = await params;
	const dict = await getDictionary(locale);

	const user = await getMe();
	if (user) {
		redirect(`/${locale}/profile`);
	}

	return (
		<section className="nw-auth-section">
			<div className="nw-auth-container">
				<h2 className="nw-auth-title">{dict.auth.passwordRecovery}</h2>

				<ForgotPasswordForm localePack={{ locale, dict }} />
			</div>
		</section>
	);
}
