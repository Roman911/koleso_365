'use client'
import { FC } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Input, Textarea } from '@heroui/input';
import Summary from './Summary';
import { Language } from '@/models/language';
import PhoneMaskInput from '@/components/UI/PhoneMaskInput';
import { NpCitySearch } from '@/components/UI/NpCitySearch';
import { NpWarehousesSearch } from '@/components/UI/NpWarehousesSearch';
import MySelect from '@/components/UI/Select';
import type { ProductsProps } from '@/models/products';
import type { OrdersParamProps } from '@/models/ordersParam';

interface OrderProps {
	data: ProductsProps | undefined
	isLoading: boolean
	loadingBtn: boolean
	showNpWarehouses: boolean | undefined
	shippingMethod: string | number | null
	cartItems: { id: number; quantity: number }[]
	onChange: (name: string, value: number | string | null) => void
	dataOrdersParam: OrdersParamProps | undefined
}

const OrderComponent: FC<OrderProps> = (
	{
		data,
		isLoading,
		cartItems,
		onChange,
		loadingBtn,
		shippingMethod,
		dataOrdersParam,
		showNpWarehouses,
	}) => {
	const locale = useLocale();
	const t = useTranslations('Order');

	const deliverysOptions = dataOrdersParam?.Deliverys.map(item => {
		return { value: item.deliverys_id, label: locale === Language.UK ? item.name : item.name_ru }
	});

	const paymentsOptions = dataOrdersParam?.Payments.map(item => {
		return { value: item.payments_id, label: locale === Language.UK ? item.name : item.name_ru }
	});

	return <div className='flex flex-col lg:flex-row gap-6 w-full'>
		<div className='flex-1'>
			<div className='bg-white pt-5 pb-8 px-6 flex flex-col gap-4'>
				<h3 className='font-bold text-xl mb-4'>
					{ t('contact details') }
				</h3>
				<Input
					isRequired
					errorMessage={ t('enter valid email') }
					label={ t('firstname') }
					name='firstname'
					type='text'
				/>
				<Input
					isRequired
					errorMessage={ t('enter valid email') }
					label={ t('lastname') }
					name='lastname'
					type='text'
				/>
				<Input
					label={ t('surname') }
					name='surname'
					type='text'
				/>
				<PhoneMaskInput/>
				<Input
					isRequired
					errorMessage={ t('enter valid email') }
					label={ t('email') }
					name='email'
					type='email'
				/>
			</div>
			<div className='bg-white pt-5 pb-8 px-6 mt-4'>
				<h3 className='font-bold text-xl'>{ t('delivery and payment') }</h3>
				<div className='relative mt-6 w-full min-w-[200px] flex flex-col gap-3'>
					<h4 className='font-semibold'>
						{ t('choose a delivery method') }
					</h4>
					<MySelect name='shipping_method' label={ t('delivery method') } options={ deliverysOptions } onChange={ onChange }/>
					{ (shippingMethod === '2' || shippingMethod === '3') && <NpCitySearch/> }
					{ shippingMethod === '2' && showNpWarehouses && <NpWarehousesSearch/> }
					{ shippingMethod === '3' && <Input
						label={ t('address') }
						name='address'
						type='text'
					/> }
					<h4 className='font-semibold mt-6'>
						{ t('choose a payment method') }
					</h4>
					<MySelect name='payment_method' label='Способ оплаты' options={ paymentsOptions } onChange={ onChange }/>
				</div>
			</div>
			<div className='bg-white pt-5 pb-8 px-6 mt-4 md:mb-20'>
				<h4 className='font-semibold'>
					{ t('add comment') }
				</h4>
				<Textarea
					name='comment'
					label={ t('your comment') }
				/>
			</div>
		</div>
		<Summary data={ data } isLoading={ isLoading } cartItems={ cartItems } loadingBtn={ loadingBtn }/>
	</div>
};

export default OrderComponent;
