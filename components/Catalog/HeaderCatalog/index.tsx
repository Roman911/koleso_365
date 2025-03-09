'use client'
import { FC, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAppDispatch } from '@/hooks/redux';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import Title from '@/components/UI/Title';
import { SeasonTransform } from '@/lib/characteristicsTransform';
import { Section } from '@/models/filter';
import { parseUrl } from '@/lib/seo';
import { resetFilter, setParams } from '@/store/slices/filterSlice';
import { baseDataAPI } from '@/services/baseDataService';

interface Brand {
	label: string;
	value: number;
}

interface UrlParams {
	sezon?: string;
	brand?: string;
	width?: string;
	height?: string;
	radius?: string;
}

interface Props {
	section: Section
	slug: string[]
}

const HeaderCatalog: FC<Props> = ({ section, slug }) => {
	const t = useTranslations('Filters');
	const dispatch = useAppDispatch();
	const [ urlParams, setUrlParams ] = useState<UrlParams>({});
	const { data } = baseDataAPI.useFetchBaseDataQuery('');
	const brandParam: Brand | null = urlParams.brand
		? section === Section.Tires
			? data?.brand.find(item => item.value === +urlParams.brand!) ?? null
			: section === Section.Disks
				? data?.brand_disc.find(item => item.value === +urlParams.brand!) ?? null
				: null
		: null;
	const title = `${urlParams.sezon ? t(SeasonTransform(urlParams.sezon)?.name || '') : ''} ${t(section)} ${brandParam?.label ?? ''} ${urlParams.width ?? ''}${urlParams.width && urlParams.height ? '/' : ''}${urlParams.height ?? ''} ${urlParams.radius ? 'R' + urlParams.radius : ''}`;

	useEffect(() => {
		dispatch(resetFilter());
	}, [dispatch]);

	useEffect(() => {
		if(slug) {
			const url = parseUrl(slug.join('/'));
			setUrlParams(url);
			dispatch(setParams(url));
		} else {
			setUrlParams({});
		}
	}, [dispatch, slug]);

	const path = [
		{
			title: t(section) || '',
			translations: false,
			href: `/catalog/${section}/`,
		},
		{
			translations: false,
			title: `${SeasonTransform(urlParams.sezon ?? '')?.name ? t(SeasonTransform(urlParams.sezon ?? '')?.name) : ''} ${t(section)}`,
			href: urlParams.sezon ? `/catalog/${section}/s-${urlParams.sezon}` : '',
		},
		{
			translations: false,
			title: `${typeof brandParam === 'object' && brandParam?.label ? brandParam.label : ''}`,
			href: urlParams.brand ? `/catalog/${section}/b-${urlParams.brand}` : '',
		},
		{
			translations: false,
			title: `${t('width')} ${urlParams.width}`,
			href: urlParams.width ? `/catalog/${section}/w-${urlParams.width}` : '',
		},
		{
			translations: false,
			title: `${t('height')} ${urlParams.height}`,
			href: urlParams.height ? `/catalog/${section}/h-${urlParams.height}` : '',
		},
		{
			translations: false,
			title: `R${urlParams.radius}`,
			href: urlParams.radius ? `/catalog/${section}/d-${urlParams.radius}` : '',
		},
		{
			translations: false,
			title: `${title}`,
			href: Object.keys(urlParams).length > 1 ? `/catalog/${section}/` : '',
		},
	];

	return (
		<>
			<Breadcrumbs path={ path } />
			<Title isMain={ true } title={ title } translations={ false } className='mt-3 text-lg font-medium px-0 md:px-3 mb-3 md:mb-1' />
		</>
	)
};

export default HeaderCatalog;
