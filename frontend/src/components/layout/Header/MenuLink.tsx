'use client';

import { defaultLocale, Locale } from '@/i18n/config';
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

	// console.log(menuItem);

	let isDefaultLocale;
	let defaultLocaleSlug;
	let itemLink = menuItem.path;

	if (menuItem.related) {
		isDefaultLocale = menuItem.related?.locale === defaultLocale;

		defaultLocaleSlug = menuItem.related?.localizations?.find(
			// @ts-expect-error - Page any type
			(item) => item.locale === defaultLocale,
		)?.slug;

		itemLink = isDefaultLocale ? `/${menuItem.related?.slug}` : `/${defaultLocaleSlug}`;
	}

	const isActive = detectActiveLink(locale, pathname, itemLink);

	return (
		// <li className={pathname === menuItem.path ? 'active-li' : ''}>
		<li className={isActive ? 'active-li' : ''}>
			<Link className={className} href={`/${locale}${itemLink}`}>
				{children}
			</Link>
		</li>
	);
}
