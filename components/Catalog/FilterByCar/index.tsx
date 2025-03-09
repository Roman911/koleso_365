'use client'
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useTranslations } from 'next-intl';
import { useAppSelector } from '@/hooks/redux';
import { Section, Subsection } from '@/models/filter';
import TypeCarLinks from '@/components/UI/TypeCarLinks';
import * as Icons from '@/components/UI/Icons';
import { Language } from '@/models/language';

const options = [
	{ label: 'cheap at first', param1: 'order[asc]', param2: '1', title: 'cheap at first', path: 'order-ch' },
	{ label: 'expensive at first', param1: 'order[asc]', param2: '0', title: 'expensive at first', path: 'order-ex' },
	{ label: 'by popularity', param1: 'order[value]=popular&order[asc]', param2: '0', title: 'by popularity', path: 'order-pop' },
	{ label: 'by number of offers', param1: 'order[value]', param2: 'offers', title: 'by number of offers', path: 'order-off' },
];

const FilterByCar = () => {
	const router = useRouter();
	const { locale, section, slug } = useParams<{ locale: Language, section: Section, slug: string[] }>();
	const t = useTranslations('Sort');
	const { subsection } = useAppSelector(state => state.filterReducer);
	const [ openSort, setOpenSort ] = useState(false);
	const [ sort, setSort ] = useState('sorting');
	const found = slug?.find(item => item.startsWith('order-'));

	useEffect(() => {
		if(found) {
			const option = options.find(i => i.path === found);
			setSort(option?.label || 'sorting');
		}
	}, [found])

	const onClick = (label: string, param1: string, param2: string, path: string) => {
		if (found) slug.splice(slug.indexOf(found), 1);
		setSort(label);
		setOpenSort(false);
		router.push(`/${locale}/catalog/${section}/${slug ? slug.join('/') : ''}/${path}`);
	}

	return (
		<div className='flex justify-end items-center lg:items-start mb-3'>
			{ subsection === Subsection.ByParams && section === Section.Tires &&
				<div className='hidden lg:flex gap-x-3 xl:gap-x-6 mr-3 xl:mr-8'>
					<TypeCarLinks section='catalog' />
				</div> }
			<div className="relative inline-block text-left z-20">
				<button type="button" onClick={() => setOpenSort(prev => !prev)}
								className="w-56 xl:w-64 h-11 p-3 flex items-center justify-between bg-white text-xs uppercase font-bold border border-gray-200 rounded-sm"
								id="menu-button">
					<div>{t(sort)}</div>
					<div className={twMerge('transition-transform', openSort && 'rotate-180')}>
						<Icons.ChevronDownIcon className='h-4 w-4' />
					</div>
				</button>
				<div
					className={twMerge('absolute right-0 z-10 w-56 xl:w-64 origin-top-right border border-gray-200 bg-white shadow-lg p-3 xl:p-5 rounded-sm', !openSort && 'hidden' )}
					tabIndex={-1}>
					<div className="py-1 text-sm xl:text-base">
						{ options.map((item, index) => {
							return <button
								key={ index }
								className={twMerge('flex items-center', index !== 0 && 'mt-3' )}
								onClick={() => onClick(item.label, item.param1, item.param2, item.path)}
							>
								{ t(item.title) }
							</button>
						})}
					</div>
				</div>
			</div>
		</div>
	)
};

export default FilterByCar;
