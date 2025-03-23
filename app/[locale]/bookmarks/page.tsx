'use client'
import { useTranslations } from 'next-intl';
import { useAppSelector } from '@/hooks/redux';
import { useAppGetProducts } from '@/hooks/getProducts';
import ProductList from '@/components/ProductList';
import LayoutWrapper from '@/components/Layout/LayoutWrapper';
import NoResult from '@/components/UI/NoResult';
import Spinner from '@/components/UI/Spinner';
import Title from '@/components/UI/Title';
import Breadcrumbs from '@/components/UI/Breadcrumbs';

export default function Bookmarks() {
	const t = useTranslations('Favorites');
	const { bookmarksItems } = useAppSelector(state => state.bookmarksReducer);
	const { products, isLoading } = useAppGetProducts(bookmarksItems, 'reducerBookmarks');

	const path = [
		{
			title: t('favorites'),
			href: '/'
		}
	];

	return <LayoutWrapper>
		<Breadcrumbs path={ path }/>
		<Title title={ t('favorites') }/>
		{ bookmarksItems.length > 0 ? <Spinner height='h-40' show={ isLoading }>
			<ProductList
				classnames='grid-cols-1 lg:grid-cols-2 lg:grid-cols-4'
				data={ { products, total_count: products.length } }
			/>
		</Spinner> : <NoResult noResultText='any products to favorites yet' /> }
	</LayoutWrapper>
};
