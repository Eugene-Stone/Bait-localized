import { TreeNavigationItem } from '@/types';
import Link from 'next/link';
import MenuLink from './MenuLink';
import MenuLinkAnchor from './MenuLinkAnchor';
import { Locale } from '@/i18n/config';
import LocaleChangeButtons from './LocaleChangeButtons';

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

					<LocaleChangeButtons locale={locale} />
				</ul>
			</div>
		</nav>
	);
}
