'use client';
import { getFooterMenu } from '@/api/api-server';
import { TreeNavigationItem } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
	menu: TreeNavigationItem[];
};

export default function FooterMenu({ menu }: Props) {
	const pathname = usePathname();

	return (
		menu && (
			<nav className="foot-nav">
				<ul>
					{menu.map((item, i) => {
						return (
							<li key={i} className={item.path === pathname ? 'active' : ''}>
								<Link href={item.path}>{item.title}</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		)
	);
}
