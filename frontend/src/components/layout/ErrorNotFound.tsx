'use client';

import { useEffect, useLayoutEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { initialDetectLocale } from '@/utils/initialDetectLocale';
import { Locale, locales } from '@/i18n/config';
import { Dictionary } from '@/i18n/getDictionary';
import Link from 'next/link';

export default function ErrorNotFound() {
	const pathname = usePathname();
	const [localePack, setLocalePack] = useState<{ locale: Locale; dict?: Dictionary } | null>(
		null,
	);

	useLayoutEffect(() => {
		async function initial() {
			const localePackInitial = await initialDetectLocale();

			setLocalePack(localePackInitial);
		}

		initial();
	}, [pathname]);

	// console.log('localePack', localePack);

	return (
		<div className="title-sect center">
			<h1 className="h1-title">
				{localePack?.dict?.errors.notFound || '404 страница не найдена'}
			</h1>
			<div className="btn-more-wrap center">
				<Link href={`/${localePack?.locale}/` || '/'} className="btn">
					{localePack?.dict?.errors.goToHome || 'На главную'}
				</Link>
			</div>
		</div>
	);
}
