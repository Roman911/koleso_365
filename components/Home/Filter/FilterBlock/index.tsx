'use client'
import Image from 'next/image';
import { FC, JSX, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useTranslations } from 'next-intl';
import { Button } from '@heroui/button';
import { useAppDispatch } from '@/hooks/redux';
import { changeSection, changeSubsection, reset as resetFilter } from '@/store/slices/filterSlice';
import { reset as resetFilterCar } from '@/store/slices/filterCarSlice';
import { Section } from '@/models/section';
import { Subsection } from '@/models/filter';

interface Props {
	children: JSX.Element
	section: Section
	onSubmit: (section: Section) => void
	subsection?: Subsection
	className?: string
}

const FilterBlock: FC<Props> = ({ children, section, onSubmit, subsection, className }) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const t = useTranslations('Main');

	const handleClick = (value: Section) => {
		dispatch(resetFilter());
		dispatch(resetFilterCar());
		dispatch(changeSection(value));
	};

	const onChangeSubsection = (value: Subsection) => {
		if(section !== Section.Battery) {
			dispatch(changeSubsection(value));
		}
	}

	const onClick = () => {
		setIsLoading(true);
		onSubmit(section);
	}

	return (
		<div
			className={ twMerge('flex-1 flex flex-col justify-between md:pt-10 md:px-6 pb-4 md:pb-0 md:bg-blue-300 rounded-3xl', className, section === Section.Battery && 'md:bg-blue-500') }>
			<div className='hidden md:flex justify-between h-12'>
				{ section === Section.Battery ?
					<div className='text-2xl uppercase font-bold text-white'>{ t('battery') }</div> :
					<div>
						<Button
							size='lg'
							radius='full'
							onPress={ () => handleClick(Section.Tires) }
							variant={ section === Section.Tires ? 'solid' : 'bordered' }
							className={ twMerge('mr-2 text-2xl uppercase font-bold text-white', section === Section.Tires ? 'bg-white text-black' : 'opacity-50') }
						>
							{ t('tires') }
						</Button>
						<Button
							size='lg'
							radius='full'
							onPress={ () => handleClick(Section.Disks) }
							variant={ section === Section.Disks ? 'solid' : 'bordered' }
							className={ twMerge('text-2xl uppercase font-bold text-white', section === Section.Disks ? 'bg-white text-black' : 'opacity-50') }
						>
							{ t('disks') }
						</Button>
					</div> }
				<div>
					<Button
						variant='light'
						onPress={ () => onChangeSubsection(Subsection.ByParams) }
						className={ twMerge('text-white font-bold', subsection === Subsection.ByCars && 'opacity-50') }
					>
						{ t('by parameters') }
					</Button>
					{ section !== Section.Battery &&
						<Button
							variant='light'
							onPress={ () => onChangeSubsection(Subsection.ByCars) }
							className={ twMerge('text-white font-bold', subsection === Subsection.ByParams && 'opacity-50') }
						>
							{ t('by car') }
						</Button> }
				</div>
			</div>
			{ children }
			{ (subsection === Subsection.ByParams || section === Section.Battery) && <div className='mt-4 md:mt-10'>
				<Button
					isLoading={ isLoading }
					size='lg'
					radius='full'
					onPress={ onClick }
					className='uppercase w-full font-bold bg-white'
				>
					{ t('choose') }
				</Button>
			</div> }
			<div className='mt-auto h-52 hidden md:flex justify-center items-end'>
				<Image priority className='object-contain' width={ 500 } height={ 166 } src={ `/images/home-filter/${ section }.png` }
							 alt=''/>
			</div>
		</div>
	)
};

export default FilterBlock;
