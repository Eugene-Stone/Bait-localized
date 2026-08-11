import { getMe } from '@/api/api-server';
import LoginForm from '@/components/LoginForm';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Пересборка каждые 60 секунд

type Props = {
	params: Promise<{ slug: string }>;
};

export default async function Login({ params }: Props) {
	const user = await getMe();
	if (user) {
		redirect('/profile');
	}

	return (
		<section className="nw-auth-section">
			<div className="nw-auth-container">
				<h2 className="nw-auth-title">Вход</h2>

				{/* При вызове useSearchParams() в клиентском компоненте Next.js может потребовать обернуть этот компонент в <Suspense></Suspense> */}
				{/* <Suspense fallback={null}> */}
				<LoginForm />
				{/* </Suspense> */}
			</div>
		</section>
	);
}
