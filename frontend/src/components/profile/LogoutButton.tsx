'use client';

import { useRouter } from 'next/navigation';
import { logout } from '@/api/api-client';
import { Locale } from '@/i18n/config';

type Props = {
	locale: Locale;
	children: React.ReactNode;
};
export default function LogoutButton({ locale, children }: Props) {
	const router = useRouter();

	async function handleClick() {
		await logout();
		router.push(`/${locale}/`);
		router.refresh();
	}
	return (
		<button className="nw-profile-menu-link" onClick={handleClick}>
			{children}
		</button>
	);
}
