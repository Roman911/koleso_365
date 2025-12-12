import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'opt.tyreclub.com.ua',
				pathname: '/api/public/img/user/**',
			},
			{
				protocol: 'https',
				hostname: 'admin.koleso365.com.ua',
				pathname: '/storage/**',
			},
		],
	},

	experimental: {
		optimizePackageImports: ['@heroui/react'],
	},
};

export default withNextIntl(nextConfig);
