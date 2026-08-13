'use client';
import { getFooterMenu } from '@/api/api-server';
import { defaultLocale, Locale } from '@/i18n/config';
import { TreeNavigationItem } from '@/types';
import { detectActiveLink } from '@/utils/detectActiveLink';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
	menu: TreeNavigationItem[];
	locale: Locale;
};

export default function FooterMenu({ menu, locale }: Props) {
	const pathname = usePathname();

	return (
		menu && (
			<nav className="foot-nav">
				<ul>
					{menu.map((item, i) => {
						let isDefaultLocale;
						let defaultLocaleSlug;
						let itemLink = item.path;

						if (item.related) {
							isDefaultLocale = item.related?.locale === defaultLocale;

							defaultLocaleSlug = item.related?.localizations?.find(
								// @ts-expect-error - Page any type
								(item) => item.locale === defaultLocale,
							)?.slug;

							itemLink = isDefaultLocale
								? `${item.related?.slug}`
								: `${defaultLocaleSlug}`;
						}

						const isActive = detectActiveLink(locale, pathname, itemLink);

						return (
							<li key={i} className={isActive ? 'active' : ''}>
								<Link href={`/${locale}/${itemLink}`}>{item.title}</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		)
	);
}
