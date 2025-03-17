'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Accordion, AccordionItem } from '@heroui/accordion';
import { useAppSelector } from '@/hooks/redux';
import FilterBlock from './FilterBlock';
import TiresFilter from './TiresFilter';
import { baseDataAPI } from '@/services/baseDataService';
import { getFilters } from './getFilters';
import { Section } from '@/models/section';
import { generateUrl } from '@/lib/seo';
import { getAkumFilters } from './getAkumFilters';
import FilterByCar from './FilterByCar';
import { Subsection } from '@/models/filter';
import * as Icons from '@/components/UI/Icons';

const Filter = () => {
	const router = useRouter();
	const { section, subsection } = useAppSelector(state => state.filterReducer);
	const locale = useLocale();
	const t = useTranslations('HeaderFilter');
	const [ filter, setFilter ] = useState({});
	const [ filterBattery, setFilterBattery ] = useState({});
	const { data } = baseDataAPI.useFetchBaseDataQuery('');
	const { data: dataAkum } = baseDataAPI.useFetchDataAkumQuery('');

	const onChange = (name: string, value: number | string | null, section: Section) => {
		if(value) {
			if(section === Section.Battery) {
				setFilterBattery(prev => ({ ...prev, [name]: value }));
			} else {
				setFilter(prev => ({ ...prev, [name]: value }));
			}
		}
	}

	const submit = (section: Section) => {
		const searchUrl = generateUrl(section === Section.Battery ? filterBattery : filter);
		const rout = `/catalog/${ section }/`;
		const newRout = `/${ locale }${ rout }`;

		router.push(newRout + searchUrl);
	}

	return (
		<section className='home-filter md:flex md:gap-4 w-full bg-blue-500 md:bg-transparent rounded-3xl py-6 px-2 md:p-0'>
			<FilterBlock onSubmit={ submit } section={ section } subsection={ subsection } className='hidden md:flex'>
				{ subsection === Subsection.ByParams ?
					<TiresFilter filters={ getFilters({ locale, section, data }) } onChange={ onChange } section={ section } /> :
					<FilterByCar section={ section } /> }
			</FilterBlock>
			<FilterBlock onSubmit={ submit } section={ Section.Battery } className='hidden md:flex'>
				<TiresFilter filters={ getAkumFilters({ data: dataAkum }) } onChange={ onChange } section={ Section.Battery }/>
			</FilterBlock>
			<h3 className='md:hidden text-white text-center text-2xl font-bold mb-4'>
				{ t('selection of tires wheels and batteries') }
			</h3>
			<Accordion variant='splitted' className='md:hidden' itemClasses={{ title: 'text-white text-center uppercase font-bold' }}>
				<AccordionItem key='1' aria-label={ t('tires by parameters') } title={ t('tires by parameters') } className='bg-blue-800 rounded-3xl'
											 startContent={ <Icons.TireIcon className='fill-white' /> }>
					<FilterBlock onSubmit={ submit } section={ Section.Tires } subsection={ subsection } className='md:hidden'>
						<TiresFilter filters={ getFilters({ locale, section, data }) } onChange={ onChange } section={ section }/>
					</FilterBlock>
				</AccordionItem>
				<AccordionItem key='2' aria-label={ t('disks by parameters') } title={ t('disks by parameters') } className='bg-blue-800 rounded-3xl'
											 startContent={ <Icons.DiskIcon className='fill-white' /> }>
					<FilterBlock onSubmit={ submit } section={ Section.Disks } subsection={ subsection } className='md:hidden'>
						<TiresFilter filters={ getFilters({ locale, section: Section.Disks, data }) } onChange={ onChange } section={ section }/>
					</FilterBlock>
				</AccordionItem>
				<AccordionItem key='3' aria-label={ t('batteries by parameters') } title={ t('batteries by parameters') } className='bg-blue-800 rounded-3xl'
											 startContent={ <Icons.Batteries className='fill-white' /> }>
					<FilterBlock onSubmit={ submit } section={ Section.Battery } subsection={ subsection } className='md:hidden'>
						<TiresFilter filters={ getAkumFilters({ data: dataAkum }) } onChange={ onChange } section={ Section.Battery }/>
					</FilterBlock>
				</AccordionItem>
				<AccordionItem key='4' aria-label={ t('selection tires by car') } title={ t('selection tires by car') } className='bg-blue-800 rounded-3xl'
											 startContent={ <Icons.CarIcon className='fill-white' /> }>
					<FilterBlock onSubmit={ submit } section={ Section.Tires } subsection={ subsection } className='md:hidden'>
						<FilterByCar section={ Section.Tires } />
					</FilterBlock>
				</AccordionItem>
			</Accordion>
		</section>
	)
};

export default Filter;