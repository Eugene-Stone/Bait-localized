import { getMe } from '@/api/api-server';
import { redirect } from 'next/navigation';
import { ViewTransition } from 'react';
import Menu from '@/components/profile/Menu';
import { Locale } from '@/i18n/config';
// import { logout } from '@/api/api-client';

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}>) {
	const { locale } = await params;
	const user = await getMe();
	if (!user) {
		redirect('/login');
	}

	return (
		<section className="nw-profile-section">
			<div className="nw-profile-container">
				<h2 className="nw-auth-title">Личный кабинет</h2>
				<div className="nw-profile-grid">
					<aside className="nw-profile-sidebar">
						<Menu locale={locale as Locale} />
					</aside>
					<div className="nw-profile-content">
						{/* <ViewTransition>{children}</ViewTransition> */}
						{children}
					</div>
				</div>
			</div>
		</section>
	);
}
