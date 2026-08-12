import { TreeNavigationItem } from '@/types';
import Link from 'next/link';
import MenuLink from './MenuLink';
import MenuLinkAnchor from './MenuLinkAnchor';
import { Locale } from '@/i18n/config';

type Props = {
	menu: TreeNavigationItem[];
	locale: Locale;
};

export default function Menu({ menu, locale }: Props) {
	// console.log(menu);
	return (
		<nav className="mnu-wrap">
			<div className="menu-header-menu-container">
				<ul className="main-mnu">
					{menu.map((item, i) => {
						if (item.additionalFields?.isAnchor) {
							return (
								<MenuLinkAnchor
									key={i}
									className="menu__link"
									menuItem={item}
									locale={locale}>
									{item.title}
								</MenuLinkAnchor>
							);
						} else {
							return (
								<MenuLink
									key={i}
									className="menu__link"
									menuItem={item}
									locale={locale}>
									{item.title}
								</MenuLink>
							);
						}
					})}

					<li>
						<Link
							className={locale === 'ru' ? 'active-lang' : ''}
							style={{ zoom: 0.75 }}
							href="/ru">
							RU
						</Link>
						<Link
							className={locale === 'en' ? 'active-lang' : ''}
							style={{ zoom: 0.75 }}
							href="/en">
							EN
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}
