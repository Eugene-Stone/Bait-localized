import { getFooterData, getFooterMenu } from '@/api/api-server';
import { BACKEND_URL } from '@/constants';
import RichText from '@/utils/RichText';
import { Footer as FooterType } from '@backend-types/footer';
import Image from 'next/image';
import Link from 'next/link';
import FooterMenu from './FooterMenu';
import { TreeNavigationItem } from '@/types';
import ButtonScrollTop from '../ButtonScrollTop';

export default async function Footer() {
	const { data }: { data: FooterType } = await getFooterData();
	const { logo, topText, bottomText, copyright } = data;
	const menuData: TreeNavigationItem[] = await getFooterMenu();

	return (
		<footer className="foot-general">
			<div className="container-fluid">
				<div className="foot-line">
					<div className="foot-cell">
						<div className="logo-wrap">
							<Link href="/" className="logo">
								<Image
									alt={logo?.alternativeText || 'Байт'}
									width={logo?.width}
									height={logo?.height}
									src={BACKEND_URL + logo?.url}
								/>
							</Link>
						</div>
					</div>
					<div className="foot-cell">
						<RichText className="f-itm">{topText}</RichText>
						<div className="flex-line">
							<div className="copyright">{copyright}</div>
							<FooterMenu menu={menuData} />
						</div>
						<RichText className="f-itm">{bottomText}</RichText>
					</div>
				</div>
			</div>

			<ButtonScrollTop />
		</footer>
	);
}
