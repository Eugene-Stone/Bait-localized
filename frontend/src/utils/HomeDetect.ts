'use client';

import { useEffect, useLayoutEffect } from 'react';

export default function HomeDetect() {
	useLayoutEffect(() => {
		document.body.classList.add('is-home');

		return () => {
			document.body.classList.remove('is-home');
		};
	}, []);

	return null;
}
