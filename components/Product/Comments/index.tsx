import { FC } from 'react';
import NoResult from '../../UI/NoResult';
import Rating from '../../UI/Rating';
import type { Review } from '@/models/product';
import CreateComment from '@/components/Product/CreateComment';

interface CommentsProps {
	review: Review[] | undefined
	model_id?: number
	product_id?: number
	trc_id?: number
}

const Comments: FC<CommentsProps> = ({ review, model_id, product_id, trc_id }) => {
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);

		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
		const year = date.getFullYear();

		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');

		return `${ day }.${ month }.${ year } ${ hours }:${ minutes }`;
	};

	return <div className='my-5 md:my-6 max-w-xl w-full'>
		{ review?.length ? review.map(item => (
			<div key={ item.review_id } className='bg-white py-4 px-6 shadow-md'>
				<div className='flex justify-between'>
					<div className='flex items-center gap-4'>
						<div className='font-bold text-lg'>{ item.name }</div>
						<div className='text-xs'>
							{ formatDate(item.created_at) }
						</div>
					</div>
					<Rating commentsAvgRate={ item.score } size='medium'/>
				</div>
				<div className='w-10 h-0.5 bg-black'></div>
				<div className='mt-3 text-sm'>
					{ item.text }
				</div>
			</div>
		)) : <NoResult noResultText='no comment' /> }
		<CreateComment
			model_id={ model_id }
			product_id={ product_id }
			trc_id={ trc_id }
		/>
	</div>
};

export default Comments;
