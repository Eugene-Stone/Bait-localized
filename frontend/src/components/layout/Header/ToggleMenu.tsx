'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
	className?: string;
	children: React.ReactNode;
}

export default function ToggleMenu({ className, children }: Props) {
	const [open, setOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setOpen(false);
			}
		};

		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;

			// Закрываем, если кликнули вне контейнера ИЛИ кликнули по ссылке внутри меню
			if (
				containerRef.current &&
				(!containerRef.current.contains(target) || target.closest('a'))
			) {
				setOpen(false);
			}
		};

		if (open) {
			document.addEventListener('keydown', handleEscape);
			document.addEventListener('click', handleClickOutside, { capture: true });
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.removeEventListener('click', handleClickOutside, { capture: true });
		};
	}, [open]);

	const toggleMenu = () => {
		setOpen((prev) => !prev);
	};

	return (
		<div ref={containerRef} className={open ? `${className} menu-open` : className}>
			{children}
			<button
				type="button"
				onClick={toggleMenu}
				aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
				aria-expanded={open}
				className={open ? 'toggle-btn on' : 'toggle-btn'}>
				<span />
			</button>
		</div>
	);
}
