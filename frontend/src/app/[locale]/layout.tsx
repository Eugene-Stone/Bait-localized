import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ButtonScrollTop from '@/components/layout/ButtonScrollTop';
import ReloadToTop from '@/utils/ReloadToTop';
import { FRONTEND_URL, SITE_TITLE } from '@/constants';

import ThemeScript from '@/components/layout/ThemeScript';
import LoadingContextProvider from '@/context/LoadingContext';
import ThemeContextProvider from '@/context/ThemeContext';

import '../../styles/style.scss';
import '../../styles/dark.scss';
import ProviderRedux from '@/redux/ProviderRedux';
import { Locale, locales } from '@/i18n/config';
import { resolveLocale } from '@/utils/resolveLocale';
import { getDictionary } from '@/i18n/getDictionary';

const themeInitializerScript = `
  (function() {
    try {
      var stored = localStorage.getItem('isDark');
      var isDark = stored ? JSON.parse(stored) : false;
      var root = document.documentElement;
      root.classList.add(isDark ? 'is-dark' : 'is-light');
      root.classList.remove(isDark ? 'is-light' : 'is-dark');
    } catch (e) {}
  })();
`;

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#ffffff' },
		{ media: '(prefers-color-scheme: dark)', color: '#000000' },
	],
	width: 'device-width',
	initialScale: 1,
};

/**
 * Какие локали существуют в приложении.
 *
 * Нужно для генерации маршрутов:
 *
 * /ru
 * /en
 */
export function generateStaticParams() {
	return locales.map((locale) => ({
		locale,
	}));
}

type LayoutMetaProps = {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LayoutMetaProps): Promise<Metadata> {
	const locale = await resolveLocale(params);
	const dict = await getDictionary(locale);

	// const title = dict.metadata.siteTitle;
	// const description = dict.metadata.siteDescription;

	return {
		metadataBase: new URL(FRONTEND_URL),
		title: dict.metadata.siteTitle,
		description: dict.metadata.siteDescription,
		keywords: dict.metadata.keywords,
		icons: {
			icon: '/images/favicon.png',
		},
		// Указываем языковые альтернативы для SEO (hreflang)
		alternates: {
			canonical: `${FRONTEND_URL}/${locale}`,
			languages: {
				ru: `${FRONTEND_URL}/ru`,
				en: `${FRONTEND_URL}/en`,
				'x-default': `${FRONTEND_URL}/ru`,
			},
		},
		robots: {
			index: true,
			follow: true,
		},
		openGraph: {
			title: dict.metadata.siteTitle,
			siteName: dict.metadata.siteTitle,
			type: 'website',
			locale: locale === 'ru' ? 'ru_RU' : 'en_US',
			description: dict.metadata.siteDescription,
			images: [
				{
					url: '/images/logo.png',
					width: 1000,
					height: 500,
				},
			],
		},
	};
}

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}>) {
	const locale = await resolveLocale(params);

	return (
		// suppressHydrationWarning - позволяет атрибутам элемента <html> изменяться внешними скриптами (до гидратации) и их не нужно сверять.
		<html lang={locale} data-scroll-behavior="smooth" suppressHydrationWarning>
			{/* <head>
				<ThemeScript />
			</head> */}
			<body>
				<ThemeScript />
				{/* <script dangerouslySetInnerHTML={{ __html: themeInitializerScript }} /> */}

				<ThemeContextProvider>
					<ProviderRedux>
						<div className="wrapper">
							{/* <ReloadToTop /> */}
							<Header locale={locale} />

							<LoadingContextProvider className="layout">
								{children}
								{/* <ViewTransition>{children}</ViewTransition> */}
							</LoadingContextProvider>

							<Footer locale={locale} />
						</div>
					</ProviderRedux>
				</ThemeContextProvider>
			</body>
		</html>
	);
}
