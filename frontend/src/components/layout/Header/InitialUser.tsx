'use client';

import { useEffect, useLayoutEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { initialDetectLocale } from '@/utils/initialDetectLocale';
import { initialDetectUser } from '@/utils/initialDetectUser';
import { UserExtended } from '@/types';
import { Locale, locales } from '@/i18n/config';
import { Dictionary } from '@/i18n/getDictionary';

export default function InitialUser() {
	const pathname = usePathname();
	const [user, setUser] = useState<UserExtended | null>(null);
	const [locale, setLocale] = useState<{ locale: Locale; dict?: Dictionary } | null>(null);

	useLayoutEffect(() => {
		async function initial() {
			const localePackInitial = await initialDetectLocale();
			const userInitial = await initialDetectUser();

			setLocale(localePackInitial);
			setUser(userInitial);
		}

		initial();
	}, [pathname]);

	return '';
}
