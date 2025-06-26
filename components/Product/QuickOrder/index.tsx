'use client'
import { FC, FormEvent, useState } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { addToast } from '@heroui/toast';
import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@heroui/modal';
import { useTranslations } from 'next-intl';
import { Section } from '@/models/filter';
import { Offers } from '@/models/product';
import { baseDataAPI } from '@/services/baseDataService';
import PhoneMaskInput from '@/components/UI/PhoneMaskInput';
import { formatPhoneNumber } from '@/lib/formatPhoneNumber';
import { Input } from '@heroui/input';

interface ItemProps {
	product_id: number
	price: string
}

interface Props {
	offerId: number
	quantity: number
	section: Section
	offerItem: Offers | ItemProps | undefined
	className?: string
}

const QuickOrder: FC<Props> = (
	{
		offerId,
		quantity,
		offerItem,
		className
	}
) => {
	const [ phoneErrorMessage, setPhoneErrorMessage ] = useState<string | null>(null);
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const [ createOrder, { isLoading } ] = baseDataAPI.useCreateOrderMutation();
	const t = useTranslations('QuickOrder');

	const onSubmit = async(event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const phone = formData.get('phone') as string;
		const phoneTransform = formatPhoneNumber(phone);

		const product = {
			product_id: offerItem?.product_id,
			offer_id: offerId,
			price: Number(offerItem?.price),
			quantity,
		};

		if(phoneTransform.length < 13) {
			setPhoneErrorMessage('enter your phone number');
		} else {
			await createOrder({
				fast: 1,
				firstname: '',
				lastname: '',
				surname: '',
				email: '',
				telephone: formatPhoneNumber(phone),
				total: Number(offerItem?.price) * quantity,
				comment: 'null',
				payment_method: 1,
				shipping_method: 1,
				payment_address_1: 'null',
				payment_address_2: 'null',
				payment_city: '',
				ref_wirehouse: '',
				ref_city: '',
				products: [ product ],
			}).then((response: {
				data?: { result: boolean, linkpay: string, order_id: number };
				error?: FetchBaseQueryError | SerializedError
			}) => {
				const data = response?.data;
				if(data) {
					addToast({
						title: t('sent order'),
						description: t('our manager'),
						classNames: { base: 'text-black', title: 'text-black' },
					});
					if(data?.linkpay?.length > 0) {
						window.open(data?.linkpay, "_blank")
					}
					if(data?.result) {
						onClose();
					}
				} else if(response.error) {
					console.error('An error occurred:', response.error);
				}
			});
		}
	}

	return (
		<>
			<Button
				onPress={ onOpen }
				radius='full'
				size='lg'
				className={ className || 'bg-[#334CCC] w-full text-white hover:shadow uppercase font-bold' }
			>
				{ t('quick order') }
			</Button>
			<Modal isOpen={ isOpen } onOpenChange={ onOpenChange } placement='top-center'>
				<ModalContent>
					{ () => (
						<>
							<ModalHeader>
								<h3 className="text-base font-semibold uppercase leading-6 text-gray-900">
									{ t('quick order') }
								</h3>
							</ModalHeader>
							<ModalBody>
								<p className="text-sm text-gray-500">
									{ t('quick order text') }
								</p>
								<Form
									className='mt-2 mb-8 flex flex-col gap-4'
									onSubmit={ onSubmit }
								>
									<Input
										isRequired
										errorMessage={ t('error text') }
										label={ t('name') }
										name='name'
										type='text'
									/>
									<PhoneMaskInput phoneErrorMessage={ phoneErrorMessage } />
									<Button type='submit' color='primary' radius='full' size='lg' className='uppercase ml-auto mt-2 font-bold rounded-full'
													isLoading={ isLoading }>
										{ t('send') }
									</Button>
								</Form>
							</ModalBody>
						</>
					) }
				</ModalContent>
			</Modal>
		</>
	)
};

export default QuickOrder;
