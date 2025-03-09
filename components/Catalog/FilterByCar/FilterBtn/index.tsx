import { FC } from 'react';
import * as Icons from '@/components/UI/Icons';

interface FilterBtnProps {
	openFilter: () => void
	title: string
}

const FilterBtn: FC<FilterBtnProps> = ({ openFilter, title }) => {
	return <button
		onClick={() => openFilter()}
		className='lg:hidden flex items-center font-bold gap-x-2.5'
	>
		<Icons.FilterIcon className='fill-black' />
		{ title }
	</button>
};

export default FilterBtn;
