'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoutButton from './LogoutButton';
import { Locale } from '@/i18n/config';
import { detectActiveLink } from '@/utils/detectActiveLink';
import { Dictionary } from '@/i18n/getDictionary';

type Props = {
	localePack: {
		locale: Locale;
		dict: Dictionary;
	};
};

export default function Menu({ localePack }: Props) {
	const pathname = usePathname();

	const { locale, dict } = localePack;

	const menu = [
		{
			title: dict.profile.menu.profile,
			href: `/${locale}/profile/info`,
		},
		{
			title: dict.profile.menu.reviewsHistory,
			href: `/${locale}/profile/reviews`,
		},
		{
			title: dict.profile.menu.commentsHistory,
			href: `/${locale}/profile/comments`,
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
							href={`${item.href}`}
							data-discover="true">
							{item.title}
						</Link>
					</li>
				);
			})}

			<li className="nw-profile-menu-item">
				<LogoutButton locale={locale}>{dict.profile.menu.logout}</LogoutButton>
			</li>
		</ul>
	);
}
