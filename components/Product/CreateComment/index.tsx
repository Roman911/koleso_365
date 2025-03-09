'use client'
import { FC, FormEvent, useState } from 'react';
import { useTranslations } from 'next-intl';
import { baseDataAPI } from '@/services/baseDataService';
import Rating from '@/components/UI/Rating';
import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import { Input, Textarea } from '@heroui/input';

interface CreateCommentProps {
	model_id?: number
	product_id?: number
	trc_id?: number
}

const CreateComment: FC<CreateCommentProps> = ({ model_id, product_id, trc_id }) => {
	const [ rate, setRate ] = useState<number>(0);
	const [ createComment, { isLoading } ] = baseDataAPI.useCreateCommentMutation();
	const t = useTranslations('CreateComment');

	const onSubmit = async(event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const name = formData.get('name');
		const text = formData.get('text');

		await createComment({
			text,
			name,
			score: rate,
			model_id,
			product_id,
			trc_id,
		}).then(data => {
			if(data) {
				event.currentTarget.reset(); // Reset form fields
				setRate(0); // Reset rating
			}
		})
	}

	return (
		<Form onSubmit={ onSubmit }>
			<div className='bg-white  shadow-md mt-6 w-full'>
				<h6 className='font-bold text-lg py-4 px-6 bg-blue-100'>
					{ t('leave review') }
				</h6>
				<div className='pt-4 px-6 pb-6 flex flex-col gap-4'>
					<Input
						isRequired
						errorMessage={ t('enter your name') }
						label={ t('name') }
						name='name'
						type='text'
					/>
					<Textarea
						name='text'
						isRequired
						errorMessage={ t('enter your comment') }
						label={ t('comment') }
					/>
					<div className='flex items-center'>
						<span className='mr-2 ml-2 text-sm font-semibold'>
							{ t('rating') }
						</span>
						<Rating commentsAvgRate={ rate } size='medium' isCreateComment={ true } setRate={ setRate }/>
					</div>
					<Button type='submit' color='primary' radius='full' size='lg'
									className='uppercase font-bold' isLoading={ isLoading } disabled={ isLoading }>
						{ t('add comment') }
					</Button>
				</div>
			</div>
		</Form>
	)
};

export default CreateComment;
