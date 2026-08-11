'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutButton from './LogoutButton';

export default function Menu() {
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
				const isActive = item.href === pathname || pathname.startsWith(`${item.href}/`);
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
							href={item.href}
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
