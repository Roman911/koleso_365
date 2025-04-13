import { FC } from 'react';

interface Props {
	createdAt: string
}

const Data: FC<Props> = ({ createdAt }) => {
	const date = new Date(createdAt);

	const day = String(date.getUTCDate()).padStart(2, '0');
	const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Add 1
	const year = date.getUTCFullYear();

	return (
		<div className='text-sm'>
			{ `${day}.${month}.${year}` }
		</div>
	)
};

export default Data;
