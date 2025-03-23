'use client'
import Head from 'next/head';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Pagination } from '@heroui/pagination';
import { baseDataAPI } from '@/services/baseDataService';
import { useAppSelector } from '@/hooks/redux';
import LayoutWrapper from '@/components/Layout/LayoutWrapper';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import Title from '@/components/UI/Title';
import Spinner from '@/components/UI/Spinner';
import ProductList from '@/components/ProductList';
import NoResult from '@/components/UI/NoResult';

const itemsProduct = 12;

export default function Search() {
	const t = useTranslations('Search');
	const [ paginateCount, setPaginateCount ] = useState(0);
	const { search } = useAppSelector(state => state.searchReducer);
	const { data, isLoading } = baseDataAPI.useFetchProductsQuery({
		id: `?name=${ search }`,
		length: itemsProduct,
		start: paginateCount > 0 ? (paginateCount -1) * itemsProduct : 0
	});

	const path = [
		{
			title: t('search'),
			href: '/'
		}
	]

	const onchange = (page: number) => {
		setPaginateCount(page)
	}

	return <LayoutWrapper>
		<Head>
			<title>{ t('search') }</title>
		</Head>
		<Breadcrumbs path={ path }/>
		<Title title={ t('search') } />
		<Spinner height='h-40' show={ isLoading }>
			{ data?.result ?
				<ProductList
					classnames='grid-cols-1 lg:grid-cols-2 lg:grid-cols-4'
					data={ data.data }
				/> :
				<NoResult noResultText='no result'/>
			}
		</Spinner>
		{ data?.result && data.data.total_count > itemsProduct && <div className='mt-10 flex justify-center'>
			<Pagination
				size='lg'
				initialPage={ paginateCount + 1 }
				total={ Math.ceil(data?.data.total_count / itemsProduct) }
				variant='bordered'
				onChange={ onchange }
				radius='full'
			/>
		</div> }
	</LayoutWrapper>
};
