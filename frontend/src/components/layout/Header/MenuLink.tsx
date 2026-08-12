'use client';

import { Locale } from '@/i18n/config';
import { TreeNavigationItem } from '@/types';
import { detectActiveLink } from '@/utils/detectActiveLink';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
	className: string;
	menuItem: TreeNavigationItem;
	children: React.ReactNode;
	locale: Locale;
};

export default function MenuLink({ className, menuItem, children, locale }: Props) {
	const pathname = usePathname();

	const isActive = detectActiveLink(locale, pathname, menuItem.path);

	return (
		// <li className={pathname === menuItem.path ? 'active-li' : ''}>
		<li className={isActive ? 'active-li' : ''}>
			<Link className={className} href={`/${locale}/${menuItem.path}`}>
				{children}
			</Link>
		</li>
	);
}
