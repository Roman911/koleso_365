import { FC } from 'react';
import ProductCard from './Card';
import type { Data } from '@/models/products';

interface Props {
	classnames?: string
	data: Data
}

const ProductList: FC<Props> = ({ classnames, data }) => {
	const products = data.products.map(item => {
		return <ProductCard key={ item.group } item={ item } />
	})

	return (
		<div className={`grid gap-3 ${classnames}`}>
			{ products }
		</div>
	)
};

export default ProductList;
