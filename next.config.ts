import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
	env: {
		SERVER_URL: process.env.SERVER_URL,
		HOSTNAME: process.env.HOSTNAME,
		HOSTNAME_TYRECLUB: process.env.HOSTNAME,
		ACCESS_ORIGIN: process.env.ACCESS_ORIGIN,
	},
	sassOptions: {
		additionalData: `$var: red;`,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: process.env.HOSTNAME_TYRECLUB || 'localhost',
				pathname: '/api/public/img/user/**',
			},
			{
				protocol: 'https',
				hostname: process.env.HOSTNAME || 'localhost',
				pathname: '/storage/**',
			},
		],
	},
};

export default withNextIntl(nextConfig);
