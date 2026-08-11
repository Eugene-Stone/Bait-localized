'use client';

import type { TreeNavigationItem } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Link as LinkScroller, scroller } from 'react-scroll';

type Props = {
	className: string;
	menuItem: TreeNavigationItem;
	children: React.ReactNode;
};

export default function MenuLinkAnchor({ className, menuItem, children }: Props) {
	const pathname = usePathname();
	const [isActive, setIsActive] = useState(false);
	const sectionId = menuItem.path.replace('/', '').replace('#', '');

	if (pathname === '/') {
		return (
			<li className={isActive ? 'active-li' : ''}>
				<LinkScroller
					className="menu__link"
					href={sectionId}
					to={sectionId}
					spy={true}
					activeClass="active"
					onSetActive={() => setIsActive(true)}
					onSetInactive={() => setIsActive(false)}
					smooth={true}
					offset={-70}
					duration={900}>
					{children}
				</LinkScroller>
			</li>
		);
	} else {
		return (
			<li>
				<Link className={className} href={`/#${sectionId}`}>
					{children}
				</Link>
			</li>
		);
	}
}
