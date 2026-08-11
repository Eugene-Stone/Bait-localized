'use client';
import { scrollToTop } from '@/utils/scrollToTop';
import { useState, useEffect } from 'react';

const ButtonScrollTop = () => {
	const [isVisible, setIsVisible] = useState(false);

	// Show button when page is scrolled down
	const toggleVisibility = () => {
		if (window.pageYOffset > 300) {
			// Show button after scrolling 300px
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', toggleVisibility);

		// Clean up the event listener when the component unmounts
		return () => {
			window.removeEventListener('scroll', toggleVisibility);
		};
	}, []);

	return (
		<button
			onClick={scrollToTop}
			className={`scroll-to-top ${isVisible ? 'visible' : ''}`}></button>
	);
};

export default ButtonScrollTop;
