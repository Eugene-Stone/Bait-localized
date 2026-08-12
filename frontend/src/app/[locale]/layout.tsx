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

/**
 * Проверяем locale, который пришел из URL.
 */
export async function resolveLocale(params: Promise<{ locale: string }>): Promise<Locale> {
	const { locale } = await params;

	if (!locales.includes(locale as Locale)) {
		notFound();
	}

	return locale as Locale;
}

export const metadata: Metadata = {
	metadataBase: new URL(FRONTEND_URL),

	// title: {
	// 	default: 'БАЙТ | Школа программирования',
	// 	template: `%s | ${SITE_TITLE}`,
	// },
	title: 'БАЙТ | Школа программирования',

	description: 'Школа программирования БАЙТ. Обучаем Python, JavaScript и веб-разработке.',
	keywords: ['школа программирования', 'Python', 'JavaScript', 'веб-разработка'],
	icons: {
		icon: '/images/favicon.png',
	},
	// alternates: {
	// 	canonical: FRONTEND_URL,
	// },

	robots: {
		index: true,
		follow: true,
	},

	openGraph: {
		title: SITE_TITLE,
		siteName: SITE_TITLE,
		type: 'website',
		locale: 'ru_RU',
		description: 'Школа программирования БАЙТ. Обучаем Python, JavaScript и веб-разработке.',
		images: [
			{
				url: '/images/logo.png',
				width: 1000,
				height: 500,
			},
		],
	},
};

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
				<script dangerouslySetInnerHTML={{ __html: themeInitializerScript }} />

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
