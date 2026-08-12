import { Locale } from '@/i18n/config';
import { redirect } from 'next/navigation';

export default async function Profile({ params }: { params: Promise<{ locale: Locale }> }) {
	const { locale } = await params;

	redirect(`/${locale}/profile/info`);
}
