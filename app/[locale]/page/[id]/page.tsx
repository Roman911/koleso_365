import type { Metadata } from 'next'
import DOMPurify from 'isomorphic-dompurify';
import LayoutWrapper from '@/components/Layout/LayoutWrapper';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import Title from '@/components/UI/Title';
import type { Pages } from '@/models/alias';
import { Language, LanguageCode } from '@/models/language';

async function getAlias(id: string): Promise<Pages> {
	const res = await fetch(`${process.env.SERVER_URL}/baseData/StatiAlias/${id}`, {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Credentials': 'true',
		}
	});
	return await res.json();
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Language, id: string }> }): Promise<Metadata> {
	const { locale, id } = await params;
	const lang = locale === Language.UK ? LanguageCode.UA : Language.RU;
	const alias = await fetch(`${process.env.SERVER_URL}/baseData/StatiAlias/${id}`)
		.then((res) => res.json());

	return {
		title: alias[id].description[lang].meta_title,
		description: alias[id].description[lang].meta_description,
	}
}

export default async function Pages({ params }: { params: Promise<{ locale: Language, id: string }> }) {
	const { locale, id } = await params;
	const lang = locale === Language.UK ? LanguageCode.UA : Language.RU;
	const alias = await getAlias(id);

	const path = [
		{
			title: alias?.[id].description[lang].title,
			href: alias?.[id].alias || '/',
		}
	];

	const HtmlContent = ({ htmlString }: { htmlString: string }) => {
		console.log(htmlString);
		const sanitizedHtml = DOMPurify.sanitize(htmlString, {
			ADD_TAGS: ['iframe'],
			ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'loading', 'referrerpolicy']
		});
		return (
			<div
				className="container mx-auto max-w-7xl mt-20 mb-24 px-2"
				dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
			/>
		);
	};

	return (
		<LayoutWrapper>
			<Breadcrumbs path={ path } />
			<Title title={ alias[id].description[lang].meta_h1 || '' } />
			<HtmlContent htmlString={ alias[id].description?.[lang].content || '' } />
		</LayoutWrapper>
	)
};
