'use client';

import { useRouter } from 'next/navigation';
import { logout } from '@/api/api-client';
import { Locale } from '@/i18n/config';
import { useTransition } from 'react';

type Props = {
	locale: Locale;
	children: React.ReactNode;
};
export default function LogoutButton({ locale, children }: Props) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	// async function handleClick() {
	// 	await logout();
	// 	router.push(`/${locale}/`);
	// 	router.refresh();
	// }

	const handleClick = async () => {
		try {
			await logout();

			// startTransition держит isPending = true до полного получения ответа от сервера
			startTransition(() => {
				router.push(`/${locale}`);
				router.refresh();
			});
		} catch (error) {
			console.error('Logout failed:', error);
		}
	};

	return (
		<button
			className={`nw-profile-menu-link logout-link ${isPending && 'sending'}`}
			onClick={handleClick}
			disabled={isPending}>
			{children}
		</button>
	);
}
