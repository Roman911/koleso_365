import type { Metadata } from 'next';
import { Section } from '@/models/filter';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import ProductComponent from '@/components/Product';
import { Language, LanguageCode } from '@/models/language';
import LayoutWrapper from '@/components/Layout/LayoutWrapper';
import TextSeo from '@/components/UI/TextSeo';
import SimilarProducts from '@/components/SimilarProducts';
import { getProduct, getSettings } from '@/app/api/api';

export async function generateMetadata({ params }: { params: Promise<{ product: string }> }): Promise<Metadata> {
	const { product } = await params;
	const match = product.match(/(\d+)$/); // match will be RegExpMatchArray | null
	const id = match ? match[1] : '';
	const response = await getProduct(id);

	return {
		title: response.data.full_name || '',
		description: response.data.full_name || '',
	}
}

export default async function Product({ params }: { params: Promise<{ locale: Language, product: string }> }) {
	const { locale, product } = await params;
	const lang = locale === Language.UK ? LanguageCode.UA : Language.RU;
	const match = product.match(/(\d+)$/); // match will be RegExpMatchArray | null
	const idProduct = match ? match[1] : '';
	const productResponse = await getProduct(idProduct);
	const settings = await getSettings();
	const section = /dia/.test(product) ? Section.Disks : /ah/.test(product)? Section.Battery : Section.Tires;

	const path = [
		{
			title: section,
			translations: true,
			href: `/catalog/${ section }`
		},
		{
			title: productResponse?.data.full_name || '',
			translations: false,
			href: `/${ section }`
		}
	];

	return (
		<LayoutWrapper>
			<Breadcrumbs path={ path }/>
			<ProductComponent
				idProduct={ idProduct }
				locale={ locale }
				data={ productResponse }
				section={ section }
				settings={ settings }
			/>
			<SimilarProducts offerGroup={ productResponse.data.offer_group } />
			<TextSeo description={ settings[lang].description }/>
		</LayoutWrapper>
	)
};
