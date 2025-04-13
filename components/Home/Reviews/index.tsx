import { FC } from 'react';
import { Review } from '@/models/product';
import Title from '@/components/UI/Title';
import ReviewItem from '@/components/Home/Reviews/ReviewItem';

interface Props {
	reviews: Review[];
}

const Reviews: FC<Props> = ({ reviews }) => {
	return (
		<div className='mt-28'>
			<Title title='customer reviews' translations={ true }/>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-12 gap-5'>
				{ reviews.map(item => {
					return <ReviewItem key={ item.review_id } review={ item } />
				}) }
			</div>
		</div>
	)
};

export default Reviews;
