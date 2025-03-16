'use client'
import { FC, FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import * as Icons from '@/components/UI/Icons';
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@heroui/modal';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Form } from '@heroui/form';
import { addToast } from '@heroui/toast';
import { baseDataAPI } from '@/services/baseDataService';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { Textarea } from '@heroui/input';

interface Props {
	id: number | undefined
	productName: string
}

const AddAskModal: FC<Props> = ({ id, productName }) => {
	const t = useTranslations('CallbackModal');
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const [ createAddAsk, { isLoading } ] = baseDataAPI.useCreateAddAskMutation();

	const onSubmit = async(event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const ask = formData.get('ask');
		const email = formData.get('email');
		await createAddAsk({
			ask,
			email,
			product_id: id,
		}).then((response: { data?: { result: boolean }; error?: FetchBaseQueryError | SerializedError }) => {
			if(response?.data?.result) {
				addToast({
					title: t('ask send'),
				});
				onClose();
			} else if(response.error) {
				console.error('An error occurred:', response.error);
			}
		});
	}

	return (
		<>
			<Button onPress={ onOpen } isIconOnly aria-label='mail' className='bg-gray-300 rounded-full group'>
				<Icons.MailIcon className='w-4 h-4 stroke-black group-hover:stroke-primary'/>
			</Button>

			<Modal isOpen={ isOpen } onOpenChange={ onOpenChange }>
				<ModalContent>
					{ () => (
						<>
							<ModalHeader className="flex items-center gap-2">
								<h3 className="text-base font-semibold leading-6 text-gray-900 uppercase" id="modal-title">
									{ t('ask') }
								</h3>
							</ModalHeader>
							<ModalBody>
								<p className="text-sm text-gray-500">
									{ productName }
								</p>
								<Form
									className='mt-2 mb-8 flex flex-col gap-4'
									onSubmit={ onSubmit }
								>
									<Input
										isRequired
										radius='none'
										errorMessage={ t('enter valid email') }
										label={ t('email') }
										name='email'
										type='email'
									/>
									<Textarea
										isRequired
										name='ask'
										radius='none'
										label={ t('your comment') }
									/>
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

export default AddAskModal;
