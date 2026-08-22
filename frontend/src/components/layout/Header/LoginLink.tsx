import Link from 'next/link';
import { getMe } from '@/api/api-getMe';
import { Locale } from '@/i18n/config';

export default async function LoginLink({ locale }: { locale: Locale }) {
	const user = await getMe();
	// console.log('user', user);

	return (
		<div className="login-link">
			{user ? (
				<Link
					aria-label="Личный кабинет студента"
					href={`/${locale}/profile`}
					data-discover="true">
					<svg
						fill="none"
						height={30}
						viewBox="0 0 24 24"
						width={30}
						xmlns="http://www.w3.org/2000/svg">
						<path
							d="m14.9999 15.2547c-1.1338-.7909-2.5127-1.2547-4-1.2547-3.59591 0-6.55854 2.7114-6.95492 6.2013-.02805.247-.04208.3705.00723.4898.04035.0975.12769.1953.22009.2464.11292.0625.25116.0625.52762.0625h5.14473m4.05525-1.7143 1.8 1.7143 4.2-4m-5-10c0 2.20914-1.7908 4-4 4-2.20912 0-3.99998-1.79086-3.99998-4s1.79086-4 3.99998-4c2.2092 0 4 1.79086 4 4z"
							stroke="#000"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}></path>
					</svg>
				</Link>
			) : (
				<Link
					aria-label="Личный кабинет студента"
					href={`/${locale}/login`}
					data-discover="true">
					<svg
						fill="none"
						height={30}
						viewBox="0 0 24 24"
						width={30}
						xmlns="http://www.w3.org/2000/svg">
						<g
							stroke="#000"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}>
							<path d="m16 7c0 2.20914-1.7909 4-4 4-2.20914 0-4-1.79086-4-4s1.79086-4 4-4c2.2091 0 4 1.79086 4 4z" />
							<path d="m12 14c-3.86599 0-7 3.134-7 7h14c0-3.866-3.134-7-7-7z" />
						</g>
					</svg>
				</Link>
			)}
		</div>
	);
}
