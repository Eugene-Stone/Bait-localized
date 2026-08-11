'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { createContext, Suspense, useContext, useEffect, useState } from 'react';

type LoadingContextType = {
	startLoading: () => void;
};

const LoadingContext = createContext<LoadingContextType | null>(null);

export function useLoadingContext() {
	const context = useContext(LoadingContext);
	if (!context) {
		throw new Error('useLoadingContext must be used within LoadingContext');
	}
	return context;
}

type Props = {
	className: string;
	children: React.ReactNode;
};

// Вспомогательный клиентский компонент для отслеживания URL в Suspense
function ParamWatcher({ onUrlChange }: { onUrlChange: () => void }) {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		onUrlChange();
	}, [pathname, searchParams, onUrlChange]);

	return null;
}

export default function LoadingContextProvider({ className, children }: Props) {
	// const pathname = usePathname();
	// const searchParams = useSearchParams();
	const [isLoading, setIsLoading] = useState(false);

	const startLoading = () => setIsLoading(true);

	// Когда URL изменился и новые данные приехали — снимаем оверлей
	// useEffect(() => {
	// 	setTimeout(() => {
	// 		setIsLoading(false);
	// 	}, 100);
	// }, [pathname, searchParams]);

	const handleUrlChange = () => {
		setTimeout(() => {
			setIsLoading(false);
		}, 100);
	};

	return (
		<LoadingContext.Provider value={{ startLoading }}>
			{/* Изолируем вызов searchParams */}
			{/* При вызове useSearchParams() в клиентском компоненте Next.js может потребовать обернуть этот компонент в <Suspense></Suspense> */}
			<Suspense fallback={null}>
				<ParamWatcher onUrlChange={handleUrlChange} />
			</Suspense>

			<main id="primary" className={`${className} ${isLoading ? 'is-loading' : ''}`}>
				{children}
			</main>
		</LoadingContext.Provider>
	);
}
