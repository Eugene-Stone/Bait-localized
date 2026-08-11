'use client';

import { TreeNavigationItem } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
	className: string;
	menuItem: TreeNavigationItem;
	children: React.ReactNode;
};

export default function MenuLink({ className, menuItem, children }: Props) {
	const pathname = usePathname();

	// Проверка с учетом границ вложенных путей
	const isActive =
		menuItem.path === '/'
			? pathname === '/'
			: pathname === menuItem.path || pathname.startsWith(`${menuItem.path}/`);

	return (
		// <li className={pathname === menuItem.path ? 'active-li' : ''}>
		<li className={isActive ? 'active-li' : ''}>
			<Link className={className} href={menuItem.path}>
				{children}
			</Link>
		</li>
	);
}
