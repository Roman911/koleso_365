import Image from 'next/image';
import { FC } from 'react';

interface Props {
	quantity: number
	group: number
	default_photo: string
	full_name: string
	price: number
}

const Item: FC<Props> = ({ quantity, group, default_photo, full_name, price }) => {
	return (
		<div key={ group } className='flex items-center py-4'>
			<Image width={ 80 } height={ 80 } src={ default_photo } alt=""/>
			<div className='ml-2 px-3 w-full'>
				<div className='font-bold text-sm'>{ full_name }</div>
				<div className='flex justify-between text-sm mt-3'>
					<div>{ quantity } шт</div>
					<div>{ price * (quantity || 1) } грн</div>
				</div>
			</div>
		</div>
	)
};

export default Item;
