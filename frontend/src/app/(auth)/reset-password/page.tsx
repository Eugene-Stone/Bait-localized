import ResetPasswordForm from '@/components/ResetPasswordForm';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Пересборка каждые 60 секунд

export default function ResetPassword() {
	return (
		<section className="nw-auth-section">
			<div className="nw-auth-container">
				<h2 className="nw-auth-title">Новый пароль</h2>

				{/* При вызове useSearchParams() в клиентском компоненте Next.js может потребовать обернуть этот компонент в <Suspense></Suspense> */}
				<Suspense fallback={<div>Loading...</div>}>
					<ResetPasswordForm />
				</Suspense>
			</div>
		</section>
	);
}
