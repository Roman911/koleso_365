import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from '@heroui/button';
import { useInView } from 'react-intersection-observer';
import Spinner from '@/components/UI/Spinner';
import Item from '@/components/Order/Summary/Item';
import type { ProductsProps } from '@/models/products';

interface SummaryProps {
	data: ProductsProps | undefined
	isLoading: boolean
	loadingBtn: boolean
	cartItems: { id: number; quantity: number }[]
}

const Summary: FC<SummaryProps> = ({ data, isLoading, loadingBtn, cartItems }) => {
	const t = useTranslations('Summary');

	const { ref, inView } = useInView(
		{
			trackVisibility: true, delay: 100, threshold: 1, rootMargin: '-20px'
		}
	);

	const items = data?.data.products.map(item => {
		const id = item.best_offer.id;
		const price = item.best_offer.price;
		const quantity = cartItems.find(i => i.id === id)?.quantity;

		return { id, price, quantity }
	});

	const totalQuantityPrice = items?.reduce((sum, item) => sum + (item.quantity ?? 0) * parseFloat(item.price), 0);

	return <div className='w-full lg:w-96'>
		<div ref={ ref }></div>
		<div className={ twMerge('bg-white w-full lg:w-96', !inView && 'lg:fixed top-4') }>
			<div className='pt-5 pb-2 px-6'>
				<h3 className='font-bold'>{ t('your order') }</h3>
				<Spinner height='h-40' show={ isLoading }>
					<div className='divide-y'>
						{ data?.data.products.map(item => {
							const quantity = cartItems.find(i => i.id === item.best_offer.id)?.quantity || 0;
							return <Item
								key={ item.group }
								quantity={ quantity }
								group={ item.group }
								default_photo={ item.default_photo }
								full_name={ item.full_name }
								price={ +item.best_offer.price }
							/>
						}) }
					</div>
				</Spinner>
			</div>
			<div className='bg-blue-50 py-5 px-6'>
				<div className='flex justify-between font-bold mb-5'>
					<div>{ t('total sum') }</div>
					<div>{ totalQuantityPrice } грн</div>
				</div>
				<Button type='submit' color='primary' radius='full' size='lg'
								className='w-full uppercase font-bold' isLoading={ loadingBtn } disabled={ loadingBtn }>
					{ t('place an order') }
				</Button>
			</div>
		</div>
	</div>
};

export default Summary;
