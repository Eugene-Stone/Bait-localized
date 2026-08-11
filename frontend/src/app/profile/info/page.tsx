import { getMe } from '@/api/api-server';
import ProfileEdit from '@/components/profile/ProfileEdit';
import { BACKEND_URL } from '@/constants';
import { UserExtended } from '@/types';
import { redirect } from 'next/navigation';

export default async function ProfileInfo() {
	const user: UserExtended = await getMe();

	if (!user) {
		redirect('/login');
	}

	return (
		<>
			<ProfileEdit user={user} />
		</>
	);
}
