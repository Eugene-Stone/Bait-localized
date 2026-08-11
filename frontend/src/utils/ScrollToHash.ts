'use client';

import { useEffect } from 'react';
import { scroller } from 'react-scroll';

export default function ScrollToHash() {
	useEffect(() => {
		// Получаем хэш из URL (например, '#about')
		const hash = window.location.hash.replace('#', '');

		if (hash) {
			// Небольшая задержка, чтобы DOM успел полностью отрендериться
			setTimeout(() => {
				scroller.scrollTo(hash, {
					smooth: true,
					offset: -70,
					duration: 900,
				});
			}, 100);
		}
	}, []);

	return null;
}
