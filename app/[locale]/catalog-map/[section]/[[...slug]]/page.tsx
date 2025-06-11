import type { Metadata } from 'next';
import LayoutWrapper from '@/components/Layout/LayoutWrapper';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import Title from '@/components/UI/Title';
import { Language } from '@/models/language';
import ProductList from '@/components/Brands/ProductList';
import BrandsList from '@/components/Brands/BrandsList';
import { language } from '@/lib/language';
import { getBrands, getSettings } from '@/app/api/api';

export async function generateMetadata({ params }: { params: Promise<{ locale: Language }> }): Promise<Metadata> {
	const { locale } = await params;
	const lang = language(locale);
	const settings = await getSettings();

	return {
		title: `${settings[lang].meta_title} | ${settings[lang].config_name}`,
		description: `${settings[lang].meta_title} | ${settings[lang].config_name}`,
	}
}

export default async function Brands({ params }: { params: Promise<{ locale: Language, section: string, slug: string[] }> }) {
	const { locale, section, slug } = await params;
	const brands = await getBrands( slug ? `${section}/${slug[0]}` : section);
	const title = `manufacturers ${ section }`;

	const path = [
		{
			title: 'brands',
			href: `/${locale}/catalog-map`,
			translations: true
		},
		{
			title: title,
			href: `/${locale}/catalog-map/${section}`,
			translations: true
		}
	];

	return (
		<LayoutWrapper>
			<Breadcrumbs path={ path } />
			<Title title={ title } translations={ true } />
			<div className='columns-2 lg:columns-4'>
				{ slug ?
					<ProductList section={ section } data={ brands } /> :
					<BrandsList brands={ brands } section={ section } />
				}
			</div>
		</LayoutWrapper>
	)
};
