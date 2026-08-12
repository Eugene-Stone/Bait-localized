'use client';
import { getFooterMenu } from '@/api/api-server';
import { Locale } from '@/i18n/config';
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
						const isActive = detectActiveLink(locale, pathname, item.path);

						return (
							<li key={i} className={isActive ? 'active' : ''}>
								<Link href={`/${locale}${item.path}`}>{item.title}</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		)
	);
}
