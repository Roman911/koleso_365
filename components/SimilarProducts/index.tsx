'use client'
import { FC } from 'react';
import { usePathname } from 'next/navigation';
import { OfferGroup } from '@/models/product';
import { Section } from '@/models/filter';
import { baseDataAPI } from '@/services/baseDataService';
import Title from '@/components/UI/Title';
import Spinner from '@/components/UI/Spinner';
import ProductList from '@/components/ProductList';

interface Props {
	offerGroup: OfferGroup
}

const SimilarProducts: FC<Props> = ({ offerGroup }) => {
	const pathname = usePathname();
	const section = /dia/.test(pathname) ? Section.Disks : Section.Tires;
	const id: string[] = [];

	const pushIfExists = (key: string, value?: string | number) => {
		if (value !== undefined && value !== null) {
			id.push(`${key}=${value}`);
		}
	};

	if (section === Section.Disks) {
		pushIfExists('width', offerGroup?.width);
		pushIfExists('radius', offerGroup?.diameter);
		pushIfExists('typedisk', offerGroup?.id_typedisc);
	} else {
		pushIfExists('width', offerGroup?.width);
		pushIfExists('height', offerGroup?.height);
		pushIfExists('radius', offerGroup?.diameter);
	}

	const params = section === Section.Disks ? `?typeproduct=3&${id.join('&')}` : `?${id.join('&')}`;
	const { data, isLoading } = baseDataAPI.useFetchProductsQuery({ id: params, length: 4 });

	return <>
		<Title title='similar products' translations={ true } />
		<Spinner height='h-40' show={ isLoading } >
			{ data?.result && <ProductList
				classnames='grid-cols-1 lg:grid-cols-2 lg:grid-cols-4 px-3 lg:px-0'
				data={ data?.data }
			/> }
		</Spinner>
	</>;
};

export default SimilarProducts;