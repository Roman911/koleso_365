'use client'
import { FC, FormEvent, useState } from 'react';
import { useTranslations } from 'next-intl';
import * as Icons from '@/components/UI/Icons';
import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import { addToast } from '@heroui/toast';
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@heroui/modal';
import PhoneMaskInput from '@/components/UI/PhoneMaskInput';
import { baseDataAPI } from '@/services/baseDataService';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { formatPhoneNumber } from '@/lib/formatPhoneNumber';

interface Props {
	id: number | undefined
	quantity: number
}

const CallbackModal: FC<Props> = ({ id, quantity }) => {
	const [ phoneErrorMessage, setPhoneErrorMessage ] = useState<string | null>(null);
	const t = useTranslations('CallbackModal');
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const [ createCallback, { isLoading } ] = baseDataAPI.useCreateCallbackMutation();

	const onSubmit = async(event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setPhoneErrorMessage(null);
		const formData = new FormData(event.currentTarget);
		const phone = formData.get('phone') as string;
		const phoneTransform = formatPhoneNumber(phone);

		if(phoneTransform.length < 13) {
			setPhoneErrorMessage('enter your phone number');
		} else {
			await createCallback({
				phone: formatPhoneNumber(phone),
				product_id: id?.toString(),
				quantity,
			}).then((response: { data?: { result: boolean }; error?: FetchBaseQueryError | SerializedError }) => {
				if(response?.data?.result) {
					addToast({
						title: t('our manager'),
					});
					onClose();
				} else if(response.error) {
					console.error('An error occurred:', response.error);
				}
			});
		}
	}

	return (
		<>
			<Button onPress={ onOpen } isIconOnly aria-label='mail' className='bg-gray-300 rounded-full group'>
				<Icons.PhoneCircuitIcon className='w-4 h-4 stroke-black group-hover:stroke-primary'/>
			</Button>
			<Modal isOpen={ isOpen } onOpenChange={ onOpenChange }>
				<ModalContent>
					{ () => (
						<>
							<ModalHeader className="flex items-center gap-2">
								<h3 className="text-base font-semibold leading-6 text-gray-900 uppercase" id="modal-title">
									{ t('callback') }
								</h3>
							</ModalHeader>
							<ModalBody>
								<Form
									className='mt-2 mb-8 flex flex-col gap-4'
									onSubmit={ onSubmit }
								>
									<p className="text-sm text-gray-500">
										{ t('put phone') }
									</p>
									<PhoneMaskInput phoneErrorMessage={ phoneErrorMessage } />
									<Button type='submit' color='primary' radius='full' size='lg' isLoading={ isLoading }
													className='uppercase font-bold'>
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

export default CallbackModal;
