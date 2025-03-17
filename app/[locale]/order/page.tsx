'use client'
import { useParams, useRouter } from 'next/navigation';
import { FormEvent, useMemo, useState } from 'react';
import { Form } from '@heroui/form';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { baseDataAPI } from '@/services/baseDataService';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useAppGetProducts } from '@/hooks/getProducts';
import { reset } from '@/store/slices/cartSlice';
import Title from '@/components/UI/Title';
import LayoutWrapper from '@/components/Layout/LayoutWrapper';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import OrderComponent from '@/components/Order';
import { resetStorage } from '@/lib/localeStorage';
import { formatPhoneNumber } from '@/lib/formatPhoneNumber';

export default function Order() {
	const router = useRouter();
	const params = useParams();
	const dispatch = useAppDispatch();
	const [ loadingBtn, setLoadingBtn ] = useState(false);
	const [ shippingMethod, setShippingMethod ] = useState<number | string | null>(1);
	const [ paymentMethod, setPaymentMethod ] = useState<number | string | null>(1);
	const [ phoneErrorMessage, setPhoneErrorMessage ] = useState<string | null>(null);
	const { cartItems } = useAppSelector(state => state.cartReducer);
	const { city, wirehouse } = useAppSelector(state => state.orderReducer);
	const { tires, cargo, disks, battery, isLoading } = useAppGetProducts(cartItems, 'reducerCart', true);
	const { data: dataOrdersParam } = baseDataAPI.useFetchOrdersParamQuery('');
	const [ createOrder ] = baseDataAPI.useCreateOrderMutation();

	const newData = useMemo(() => ({
		result: true,
		data: {
			total_count: 5,
			products: [ ...tires, ...cargo, ...disks, ...battery ],
		},
	}), [ battery, cargo, disks, tires ]);

	const products = newData?.data.products?.map((item) => {
		return {
			product_id: item.product_id,
			offer_id: item.best_offer.id,
			price: Number(item.best_offer.price),
			quantity: cartItems.find(i => i.id === item.best_offer.id)?.quantity,
		}
	});

	const items = newData?.data.products.map(item => {
		const id = item.best_offer.id;
		const price = item.best_offer.price;
		const quantity = cartItems.find(i => i.id === id)?.quantity;

		return { id, price, quantity }
	});

	const total = items?.reduce((sum, item) => sum + (item.quantity ?? 0) * parseFloat(item.price), 0);

	const path = [
		{
			title: 'cart',
			href: '/cart',
			translations: true
		},
		{
			title: 'placing an order',
			href: '/',
			translations: true
		},
	];

	const onSubmit = async(event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setPhoneErrorMessage(null);
		const formData = new FormData(event.currentTarget);
		const phone = formData.get('phone') as string;
		const phoneTransform = formatPhoneNumber(phone);
		const firstname = formData.get('firstname');
		const lastname = formData.get('lastname');
		const surname = formData.get('surname');
		const email = formData.get('email');
		const comment = formData.get('comment');
		const address = formData.get('address');

		if(phoneTransform.length < 13) {
			setPhoneErrorMessage('enter your phone number');
		} else {
			await createOrder({
				fast: 0,
				firstname,
				lastname,
				surname,
				email,
				telephone: phoneTransform,
				total,
				comment: comment || 'null',
				payment_method: paymentMethod,
				shipping_method: shippingMethod,
				payment_address_1: wirehouse.label || 'null',
				payment_address_2: address || 'null',
				payment_city: city.label,
				ref_wirehouse: wirehouse.value,
				ref_city: city.value,
				products,
			}).then((response: {
				data?: { result: boolean, linkpay: string, order_id: number };
				error?: FetchBaseQueryError | SerializedError
			}) => {
				const data = response?.data;
				if(data) {
					if(data.linkpay?.length > 0) window.open(data?.linkpay, "_blank")
					if(data.result) {
						dispatch(reset());
						resetStorage('reducerCart');
						router.push(`/${ params.locale }/order/successful`);
					}
				} else if(response.error) {
					console.error('An error occurred:', response.error);
				}
			}).finally(() => {
				setLoadingBtn(false);
			});
		}
	}

	const onChange = (name: string, value: number | string | null) => {
		if(name === 'shipping_method') {
			setShippingMethod(value);
		} else if(name === 'payment_method') {
			setPaymentMethod(value);
		}
	}

	return <LayoutWrapper>
		<div className='max-w-5xl mx-auto'>
			<Breadcrumbs path={ path }/>
			<Title title='placing an order' translations={ true }/>
			<Form
				onSubmit={ onSubmit }
			>
				<OrderComponent
					data={ newData }
					isLoading={ isLoading }
					cartItems={ cartItems }
					onChange={ onChange }
					loadingBtn={ loadingBtn }
					shippingMethod={ shippingMethod }
					dataOrdersParam={ dataOrdersParam }
					showNpWarehouses={ city.value?.length > 0 }
					phoneErrorMessage={ phoneErrorMessage }
				/>
			</Form>
		</div>
	</LayoutWrapper>
};
