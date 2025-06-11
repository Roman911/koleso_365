import { ReactNode } from 'react';
import Script from 'next/script';
import { GoogleAnalytics } from '@next/third-parties/google';
import localFont from 'next/font/local'
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import StoreProvider from '@/app/StoreProvider';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { getAliasAll, getSettings } from '@/app/api/api';
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

export default async function RootLayout(
	{
		children,
		params,
	}: Readonly<{
		children: ReactNode;
		params: Promise<{ locale: Language }>;
	}>) {
	const { locale } = await params;
	const messages = await getMessages();
	const response = await getSettings();
	const alias = await getAliasAll();

	return (
		<html lang={ locale }>
		<head>
			<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
			{ response[0].head_html && <Script
				id="binotel-widget"
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: response[0].head_html,
				}}
			/> }
		</head>
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
		{ response?.[0].google_tag_manager && <GoogleAnalytics gaId={ response[0].google_tag_manager } /> }
		</html>
	);
};
