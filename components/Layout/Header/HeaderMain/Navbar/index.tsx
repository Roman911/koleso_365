'use client'
import { useRef, useState, MouseEvent, SetStateAction } from 'react';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import { Link } from '@/i18n/routing';
import { useClickOutside } from '@/hooks/clickOutside';
import CarTireFilter from '../CarTireFilter';
import CarDiskFilter from '../CarDiskFilter';
import * as Icons from '@/components/UI/Icons';
import { links } from '../../links';

const Navbar = () => {
	const t = useTranslations('Main');
	const [ open, setOpen ] = useState(false);
	const [ section, setSection ] = useState('tires');
	const filterRef = useRef<HTMLDivElement>(null);

	const closeFilter = () => {
		setOpen(false);
	}

	useClickOutside({ ref: filterRef, open, onClose: closeFilter });

	const handleClick = (event: MouseEvent<HTMLButtonElement>, value: SetStateAction<string>) => {
		event.stopPropagation();
		setOpen(!(open && section === value));
		if(section !== value) {
			setSection(value);
		}
	};

	const ButtonMeu = ({ sectionItem, label }: { sectionItem: string, label: string }) => (
		<button
			type='button'
			onClick={ event => handleClick(event, sectionItem) }
			className={
				twMerge('inline-flex items-center gap-x-1.5 font-semibold group transition hover:text-primary outline-none',
					(open && section === sectionItem) && 'text-primary'
				) }
		>
			<span>{ label }</span>
			<span className='transition'>
					<Icons.ChevronDownIcon
						width='14'
						height='14'
						strokeWidth='2'
						className={
							twMerge('stroke-black transition group-hover:stroke-primary',
								(open && section === sectionItem) && 'stroke-primary rotate-180')
						}
					/>
				</span>
		</button>
	)

	return (
		<>
			<nav className='container text-lg mx-auto max-w-[680px] flex justify-between items-center gap-2 p-5 pr-8'>
				{[{ section: 'tires', label: t('tires') }, { section: 'disks', label: t('disks') }]
					.map((item, i) => {
						return <ButtonMeu key={ i } sectionItem={ item.section } label={ item.label } />
					})}
				{ links.map((item, index) => {
					return <Link key={ index } href={ item.url }
											 className='font-semibold hover:text-primary'>
						{ t(item.title) }
					</Link>
				}) }
			</nav>
			<div
				ref={ filterRef }
				className={ twMerge('absolute left-0 right-0 top-24 z-30 flex w-full -mt-0.5', !open && 'hidden') }>
				<div
					className='w-full overflow-hidden bg-white shadow-lg pt-8 pb-6 font-normal'>
					<div className='flex-auto max-w-7xl grid grid-cols-4 mx-auto px-4'>
						{ section === 'tires' ? <CarTireFilter closeFilter={ closeFilter } /> :
							<CarDiskFilter closeFilter={ closeFilter } /> }
					</div>
				</div>
			</div>
		</>
	)
};

export default Navbar;
