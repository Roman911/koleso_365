import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import { Button } from '@heroui/button';
import { useAppDispatch } from '@/hooks/redux';
import { Subsection } from '@/models/filter';
import { changeSubsection } from '@/store/slices/filterSlice';

const tabs = [
	{ title: 'by parameters', section: Subsection.ByParams },
	{ title: 'by car', section: Subsection.ByCars }
];

const SwitchTabsByParams = ({ subsection }: { subsection: Subsection }) => {
	const dispatch = useAppDispatch();
	const t = useTranslations('Catalog');

	const handleClick = (value: Subsection) => {
		dispatch(changeSubsection(value));
	}

	return (
		<div className='flex lg:justify-between gap-x-5'>
			{ tabs.map((item, index) => (

				<Button
					key={index}
					variant='light'
					onPress={ () => handleClick(item.section) }
					className={ twMerge(
						'font-bold uppercase lg:normal-case text-gray-500 p-0 hover:bg-transparent hover:text-black',
						subsection === item.section && 'text-black')
				}>
					{ t(item.title) }
				</Button>
			)) }
		</div>
	)
};

export default SwitchTabsByParams;
