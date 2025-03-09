'use client'
import { FC, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '@heroui/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/modal';
import { useAppSelector } from '@/hooks/redux';
import { NpCitySearch } from '@/components/UI/NpCitySearch';
import Quantity from '@/components/UI/Quantity';
import NpDocumentPrice from '@/components/UI/NpDocumentPrice';

interface Props {
	offer_id?: number
}

const DeliveryCalculation: FC<Props> = ({ offer_id }) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [ quantity, setQuantity ] = useState(1);
	const { city } = useAppSelector(state => state.orderReducer);
	const [ showDescription, setShowDescription ] = useState<boolean>(false);
	const t = useTranslations('Delivery calculation');

	const onSetQuantity = (_: number, quan: number) => {
		setQuantity(quan);
	}

	const handleClick = () => {
		setShowDescription(true);
	}

	const onChange = (e: { target: HTMLInputElement }) => {
		const value = e.target.value;
		const onlyNumbers = value.replace(/\D/g, '');
		const numericValue = Number(onlyNumbers);

		setQuantity(numericValue < 99 ? numericValue : 99);
	}

	return (
		<>
			<Button
				onPress={ onOpen }
				className='delivery-calculation bg-white mt-6 text-sm font-medium border rounded-full border-black w-full md:w-72 hover:bg-white hover:shadow'
			>
				<Image width={ 48 } height={ 32 } className='mr-2.5' src='/icons/truck.svg' alt=""/>
				{ t('delivery calculation') }
			</Button>
			<Modal isOpen={ isOpen } onOpenChange={ onOpenChange }>
				<ModalContent>
					{ (onClose) => (
						<>
							<ModalHeader className="flex items-center gap-2">
								<Image width={ 18 } height={ 18 } src='/images/nova-poshta-logo-white-bg.png' alt=""/>
								<h3 className="text-base font-semibold leading-6 text-gray-900">
									{ t('delivery calculation') }
								</h3>
							</ModalHeader>
							<ModalBody>
								<div className="mt-3 sm:ml-4 sm:mt-0 sm:text-left">
									<div className='mt-6 mb-4'>
										{ !showDescription && <>
											<p className='mt-4'>
												{ t('specify city') }
											</p>
											<NpCitySearch />
											<p className='mt-4 mb-2'>
												{ t('specify quantity') }
											</p>
											<Quantity
												id={ 0 }
												quantity={ quantity }
												offerQuantity={ 99 }
												onChange={ onChange }
												setQuantity={ onSetQuantity }
											/>
										</> }
										{ showDescription && city.value.length > 0 && <NpDocumentPrice offer_id={ offer_id } quantity={ quantity } /> }
									</div>
								</div>
							</ModalBody>
							<ModalFooter>
								{ showDescription ? <Button onPress={ onClose } color='primary' radius='full' size='lg' className='w-max px-5 uppercase font-bold'>
									{ t('close') }
								</Button> : <Button onPress={ handleClick } color='primary' radius='full' size='lg' className='w-max px-5 uppercase font-bold'>
									{ t('calculate') }
								</Button> }
							</ModalFooter>
						</>
					) }
				</ModalContent>
			</Modal>
		</>
	)
};

export default DeliveryCalculation;
