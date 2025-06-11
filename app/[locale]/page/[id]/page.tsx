import type { Metadata } from 'next'
import DOMPurify from 'isomorphic-dompurify';
import LayoutWrapper from '@/components/Layout/LayoutWrapper';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import Title from '@/components/UI/Title';
import { Language, LanguageCode } from '@/models/language';
import { getAlias } from '@/app/api/api';
import { language } from '@/lib/language';

export async function generateMetadata({ params }: { params: Promise<{ locale: Language, id: string }> }): Promise<Metadata> {
	const { locale, id } = await params;
	const lang = language(locale);
	const alias = await getAlias(id);

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
