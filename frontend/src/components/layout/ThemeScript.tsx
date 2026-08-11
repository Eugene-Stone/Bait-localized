'use client';
// Для корректной работы скрипта смены темы при загрузке
import { useServerInsertedHTML } from 'next/navigation';

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

export default function ThemeScript() {
	useServerInsertedHTML(() => (
		<script dangerouslySetInnerHTML={{ __html: themeInitializerScript }} />
	));

	return null;
}
