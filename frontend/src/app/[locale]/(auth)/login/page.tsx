import { getMe } from '@/api/api-getMe';
import LoginForm from './LoginForm';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export const dynamic = 'force-static'; // 'force-dynamic' || 'force-static';
// export const revalidate = 60; // Пересборка каждые 60 секунд, работает если выбрано 'force-static'

type Props = {
	params: Promise<{ locale: Locale; slug: string }>;
};

export default async function Login({ params }: Props) {
	const { locale } = await params;
	const dict = await getDictionary(locale);

	const user = await getMe();
	if (user) {
		redirect(`/${locale}/profile`);
	}

	return (
		<section className="nw-auth-section">
			<div className="nw-auth-container">
				<h2 className="nw-auth-title">{dict.auth.login}</h2>

				{/* При вызове useSearchParams() в клиентском компоненте Next.js может потребовать обернуть этот компонент в <Suspense></Suspense> */}
				{/* <Suspense fallback={null}> */}
				<LoginForm localePack={{ locale, dict }} />
				{/* </Suspense> */}
			</div>
		</section>
	);
}
