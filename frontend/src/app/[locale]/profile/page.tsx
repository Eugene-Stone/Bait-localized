import { Locale } from '@/i18n/config';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic'; // 'force-dynamic' || 'force-static';
// export const revalidate = 60; // Пересборка каждые 60 секунд, работает если выбрано 'force-static'

export default async function Profile({ params }: { params: Promise<{ locale: Locale }> }) {
	const { locale } = await params;

	redirect(`/${locale}/profile/info`);
}
