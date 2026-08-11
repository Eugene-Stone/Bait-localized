import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	experimental: {
		viewTransition: true,
	},
	images: {
		unoptimized: true,
	},
	// Разрешает HMR и запросы ресурсов с любых локальных IP
	allowedDevOrigins: ['*.local', '192.168.*.*', '10.*.*.*'],
};

export default nextConfig;
