import type { Metadata } from 'next';
import localFont from 'next/font/local'
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import StoreProvider from '@/app/StoreProvider';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import '../colors.css';
import '../globals.css';
import { Language } from '@/models/language';
import { ToastProvider } from "@heroui/toast";

const gilroy = localFont({
	src: [
		{
			path: '../../public/fonts/Gilroy-Regular.woff',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../public/fonts/Gilroy-SemiBold.woff',
			weight: '600',
			style: 'normal',
		},
		{
			path: '../../public/fonts/Gilroy-Bold.woff',
			weight: '700',
			style: 'normal',
		},
	],
})

export const metadata: Metadata = {
	icons: [
		{
			rel: 'icon',
			type: 'image/png',
			url: '/favicon-48x48.png',
			sizes: '48x48',
		},
		{
			rel: 'icon',
			type: 'image/svg+xml',
			url: '/favicon.svg',
		},
		{
			rel: 'shortcut icon',
			url: '/favicon.ico',
		},
		{
			rel: 'apple-touch-icon',
			sizes: '180x180',
			url: '/apple-touch-icon.png'
		},
		{
			rel: 'manifest',
			url: '/site.webmanifest',
		}
	]
};

async function getSettings() {
	const res = await fetch(`${process.env.SERVER_URL}/baseData/settings`, {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Credentials': 'true',
		}
	});
	return await res.json();
}

async function getAlias() {
	const res = await fetch(`${process.env.SERVER_URL}/baseData/StatiAlias`, {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Credentials': 'true',
		}
	});
	return await res.json();
}

export default async function RootLayout(
	{
		children,
		params,
	}: Readonly<{
		children: React.ReactNode;
		params: Promise<{ locale: Language }>;
	}>) {
	const { locale } = await params;
	const messages = await getMessages();
	const response = await getSettings();
	const alias = await getAlias();

	return (
		<html lang={ locale }>
		<body className={ gilroy.className }>
		<StoreProvider>
			<NextIntlClientProvider messages={ messages }>
				<Header settings={ response } alias={ alias } />
				<main>
					{ children }
				</main>
				<Footer settings={ response } alias={ alias } />
			</NextIntlClientProvider>
			<ToastProvider placement='top-right' />
		</StoreProvider>
		</body>
		</html>
	);
};
