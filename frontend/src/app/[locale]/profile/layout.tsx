import { getMe } from '@/api/api-server';
import { redirect } from 'next/navigation';
import Menu from '@/components/profile/Menu';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
// import { logout } from '@/api/api-client';

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}>) {
	const { locale } = (await params) as { locale: Locale };

	const user = await getMe();
	if (!user) {
		redirect(`/${locale}/login`);
	}

	const dict = await getDictionary(locale);

	return (
		<section className="nw-profile-section">
			<div className="nw-profile-container">
				<h2 className="nw-auth-title">{dict.profile.personalAccount}</h2>
				<div className="nw-profile-grid">
					<aside className="nw-profile-sidebar">
						<Menu localePack={{ locale, dict }} />
					</aside>

					{/* <ViewTransition>{children}</ViewTransition> */}
					{children}
				</div>
			</div>
		</section>
	);
}
