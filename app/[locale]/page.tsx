import type { Metadata } from 'next';
import { Language, LanguageCode } from '@/models/language';
import LayoutWrapper from '@/components/Layout/LayoutWrapper';
import Filter from '@/components/Home/Filter';
import Title from '@/components/UI/Title';
import NoResult from '@/components/UI/NoResult';
import ProductList from '@/components/ProductList';
import TextSeo from '@/components/UI/TextSeo';
import PopularSizes from '@/components/Home/PopularSizes';
import PopularCarBrands from '@/components/Home/PopularCarBrands';
import Reviews from '@/components/Home/Reviews';

async function getSettings() {
	const res = await fetch(`${ process.env.SERVER_URL }/baseData/settings`, {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Credentials': 'true',
		}
	});
	return await res.json();
}

async function getProducts() {
	const res = await fetch(`${ process.env.SERVER_URL }/api/getProducts?typeproduct=1&order[value]=featured&order[asc]=0`, {
		method: 'POST',
		headers: {
			'Access-Control-Allow-Credentials': 'true',
			'content-type': 'application/json',
		},
		body: JSON.stringify({ start: 0, length: 4 }),
	});
	return await res.json();
}

async function getProductsAkum() {
	const res = await fetch(`${ process.env.SERVER_URL }/api/getProducts?typeproduct=4&order[value]=featured&order[asc]=0`, {
		method: 'POST',
		headers: {
			'Access-Control-Allow-Credentials': 'true',
			'content-type': 'application/json',
		},
		body: JSON.stringify({ start: 0, length: 4 }),
	});
	return await res.json();
}

async function getFeatureParams() {
	const res = await fetch(`${ process.env.SERVER_URL }/api/getFeatureParams`, {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Credentials': 'true',
		}
	});
	return await res.json();
}

async function getReviews() {
	const res = await fetch(`${ process.env.SERVER_URL }/api/reviews`, {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Credentials': 'true',
		}
	});
	return await res.json();
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Language }> }): Promise<Metadata> {
	const { locale } = await params;
	const lang = locale === Language.UK ? LanguageCode.UA : Language.RU;
	const response = await fetch(`${ process.env.SERVER_URL }/baseData/settings`)
		.then((res) => res.json());

	return {
		title: response[lang].meta_title,
		description: response[lang].meta_description,
	}
}

export default async function Home({ params }: { params: Promise<{ locale: Language }> }) {
	const locale = (await params).locale;
	const lang = locale === Language.UK ? LanguageCode.UA : Language.RU;
	const response = await getSettings();
	const products = await getProducts();
	const productsAkum = await getProductsAkum();
	const featureParams = await getFeatureParams();
	const reviews = await getReviews();

	return (
		<main>
			<LayoutWrapper>
				<Filter />
				<Title title={ response[lang].h2_top } className='mt-12 mb-5 text-3xl lg:text-4xl font-bold px-3 lg:px-0' />
				{ products.result ? <ProductList
					classnames='grid-cols-1 lg:grid-cols-2 lg:grid-cols-4'
					data={ products.data }
				/> : <NoResult noResultText='no result'/> }
				{ productsAkum.result ? <ProductList
					classnames='grid-cols-1 lg:grid-cols-2 lg:grid-cols-4 mt-4'
					data={ productsAkum.data }
				/> : <NoResult noResultText='no result'/> }
				{ featureParams.ProductTiporazmer && <PopularSizes locale={ locale } settings={ response } popularSizes={ featureParams.ProductTiporazmer } /> }
				{ reviews && <Reviews reviews={ reviews } /> }
				{ featureParams.Car2Brand && <PopularCarBrands locale={ locale } settings={ response } popularCarBrands={ featureParams.Car2Brand } /> }
				<TextSeo description={ response[lang].description }/>
			</LayoutWrapper>
		</main>
	);
};
