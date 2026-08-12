'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutButton from './LogoutButton';
import { Locale } from '@/i18n/config';
import { detectActiveLink } from '@/utils/detectActiveLink';

type Props = {
	locale: Locale;
};

export default function Menu({ locale }: Props) {
	const pathname = usePathname();

	const menu = [
		{
			title: 'Профиль',
			href: '/profile/info',
		},
		{
			title: 'История отзывов',
			href: '/profile/reviews',
		},
		{
			title: 'История коментариев',
			href: '/profile/comments',
		},
	];

	return (
		<ul className="nw-profile-menu">
			{menu.map((item, i) => {
				// const isActive = item.href === pathname || pathname.startsWith(`${item.href}/`);
				const isActive = detectActiveLink(locale, pathname, item.href);

				return (
					<li
						key={i}
						className={
							isActive
								? 'nw-profile-menu-item nw-profile-menu-link-active'
								: 'nw-profile-menu-item'
						}>
						<Link
							className="nw-profile-menu-link"
							href={`/${locale}/${item.href}`}
							data-discover="true">
							{item.title}
						</Link>
					</li>
				);
			})}

			<li className="nw-profile-menu-item">
				<LogoutButton />
			</li>
		</ul>
	);
}
