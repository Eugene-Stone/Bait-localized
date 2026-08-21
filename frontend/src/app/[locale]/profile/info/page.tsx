import { getMe } from '@/api/api-server';
import ProfileEdit from '@/components/profile/ProfileEdit';
import { BACKEND_URL } from '@/constants';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { UserExtended } from '@/types';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

type Props = {
	params: Promise<{ locale: Locale }>;
};
export default async function ProfileInfo({ params }: Props) {
	const { locale } = await params;
	const dict = await getDictionary(locale);

	const user: UserExtended = await getMe();

	if (!user) {
		redirect(`/${locale}/login`);
	}

	return (
		<div className="nw-profile-content">
			{/* <Suspense fallback={'загрузка'}></Suspense> */}
			<ProfileEdit localePack={{ locale, dict }} user={user} />
		</div>
	);
}
