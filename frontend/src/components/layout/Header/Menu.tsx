import { TreeNavigationItem } from '@/types';
import Link from 'next/link';
import MenuLink from './MenuLink';
import MenuLinkAnchor from './MenuLinkAnchor';

type Props = {
	menu: TreeNavigationItem[];
};

export default function Menu({ menu }: Props) {
	// console.log(menu);
	return (
		<nav className="mnu-wrap">
			<div className="menu-header-menu-container">
				<ul className="main-mnu">
					{menu.map((item, i) => {
						if (item.additionalFields?.isAnchor) {
							return (
								<MenuLinkAnchor key={i} className="menu__link" menuItem={item}>
									{item.title}
								</MenuLinkAnchor>
							);
						} else {
							return (
								<MenuLink key={i} className="menu__link" menuItem={item}>
									{item.title}
								</MenuLink>
							);
						}
					})}
				</ul>
			</div>
		</nav>
	);
}
