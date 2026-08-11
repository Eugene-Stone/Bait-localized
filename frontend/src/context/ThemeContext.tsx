'use client';

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

type ThemeContextType = {
	isDark: boolean;
	setIsDark: Dispatch<SetStateAction<boolean>>;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function useThemeContext() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useThemeContext must be used within ThemeContext');
	}
	return context;
}

type Props = {
	children: React.ReactNode;
};

export default function ThemeContextProvider({ children }: Props) {
	// Lazy initialization to read localStorage immediately on the client side
	const [isDark, setIsDark] = useState<boolean>(() => {
		if (typeof window !== 'undefined') {
			const stored = localStorage.getItem('isDark');
			return stored ? JSON.parse(stored) : false;
		}
		return false;
	});

	// Sync DOM class and localStorage when isDark state changes
	useEffect(() => {
		const root = document.documentElement;

		if (isDark) {
			root.classList.add('is-dark');
			root.classList.remove('is-light');
		} else {
			root.classList.add('is-light');
			root.classList.remove('is-dark');
		}

		localStorage.setItem('isDark', JSON.stringify(isDark));
	}, [isDark]);

	return <ThemeContext.Provider value={{ isDark, setIsDark }}>{children}</ThemeContext.Provider>;
}
