// import useToggleMenu from '@/hooks/useToggleMenu';

import ToggleMenu from './ToggleMenu';
import { BACKEND_URL } from '@/constants';
import type { Header as HeaderType } from '@backend-types/header';
import { TreeNavigationItem } from '@/types';
import Image from 'next/image';
import { getHeaderData, getHeaderMenu } from '@/api/api-server';
import Menu from './Menu';
import ThemeToggleButton from './ThemeToggleButton';

import LoginLink from './LoginLink';
import { Suspense } from 'react';

export default async function Header() {
	const { data }: { data: HeaderType } = await getHeaderData();
	const { title, logo } = data;
	const menuData: TreeNavigationItem[] = await getHeaderMenu();

	return (
		<header className="head-general">
			<div className="head-top">
				<div className="container-fluid">
					<div className="head-line">
						<div className="head-cell">
							<div className="logo-wrap">
								{/* eslint-disable-next-line */}
								<a className="logo" href="/">
									<Image
										alt={title ? title : ''}
										width={logo?.width}
										height={logo?.height}
										src={BACKEND_URL + logo?.url}
										priority
										fetchPriority="high"
									/>
								</a>
							</div>
						</div>
						<ToggleMenu className="head-cell">
							<Menu menu={menuData} />

							<Suspense fallback={null}>
								<LoginLink />
							</Suspense>

							<ThemeToggleButton />
						</ToggleMenu>
					</div>
				</div>
			</div>
		</header>
	);
}
