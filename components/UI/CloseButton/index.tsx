import { FC, type MouseEventHandler } from 'react';

import { CloseIcon } from '../Icons';

interface CloseButtonProps {
	handleClick: MouseEventHandler<HTMLDivElement | HTMLButtonElement>
}

const CloseButton: FC<CloseButtonProps> = ({ handleClick }) => {
	return (
		<button
			className='absolute right-3 top-3'
			onClick={ handleClick }
		>
			<CloseIcon className='transition duration-150 ease-in fill-gray-400 hover:fill-gray-500'/>
		</button>
	)
};

export default CloseButton;
