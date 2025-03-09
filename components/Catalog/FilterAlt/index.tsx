'use client'
import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useDisclosure } from '@heroui/modal';
import { Drawer, DrawerContent } from '@heroui/drawer';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setParams } from '@/store/slices/filterSlice';
import SwitchTabs from './SwitchTabs';
import SwitchTabsByParams from './SwitchTabsByParams';
import { Section } from '@/models/filter';
import type { BaseDataProps } from '@/models/baseData';
import { SubmitFloat } from '@/components/Catalog/FilterAlt/SubmitFloat';
import { baseDataAPI } from '@/services/baseDataService';
import ByCar from '@/components/Catalog/FilterAlt/ByCar';
import { SelectFromTo } from '@/components/Catalog/FilterAlt/SelectFromTo';
import FilterBtn from '@/components/Catalog/FilterByCar/FilterBtn';
import SectionTires from '@/components/Catalog/FilterAlt/SectionTires';
import SectionDisks from '@/components/Catalog/FilterAlt/SectionDisks';
import SectionBattery from '@/components/Catalog/FilterAlt/SectionBattery';

interface Props {
	filterData: BaseDataProps | undefined
	section: Section
}

const FilterAlt: FC<Props> = ({ filterData, section }) => {
	const t = useTranslations('Filters')
	const [ element, setElement ] = useState<HTMLElement | null>(null);
	const dispatch = useAppDispatch();
	const { subsection } = useAppSelector(state => state.filterReducer);
	const { data } = baseDataAPI.useFetchBaseDataQuery('');
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const onChange = (name: string, value: number | string | undefined | null, element: HTMLElement) => {
		if(name === 'brand') {
			dispatch(setParams({ model_id: null }));
		}
		setElement(element);
		dispatch(setParams({ [name]: value }));
	}

	return (
		<div>
			<FilterBtn openFilter={ onOpen } title={ t('filters') }/>
			<div className='hidden md:block'>
				<div
					className='filter lg:h-auto w-[calc(100%-70px)] lg:w-64 mr-6 pt-4 lg:pt-0 bg-white lg:bg-transparent'>
					<SwitchTabs section={ section }/>
				</div>
				<div
					className='relative pb-32 lg:pb-4 px-4 pt-4 bg-white border border-gray-200 z-10 overflow-y-auto md:overflow-y-visible'>
					<SubmitFloat element={ element } btnTitle={ t('to apply') } setElement={ setElement } offset={ Section.Battery ? 354 : 360 }/>
					{ section !== Section.Battery && <SwitchTabsByParams subsection={ subsection }/> }
					{ subsection === 'byCars' && <ByCar data={ data }/> }
					{ section === Section.Tires && <SectionTires onChange={ onChange } filterData={ filterData } /> }
					{ section === Section.Disks && <SectionDisks onChange={ onChange } filterData={ filterData } /> }
					{ section === Section.Battery && <SectionBattery onChange={ onChange } /> }
					<SelectFromTo name='price' nameMin='minPrice' nameMax='maxPrice' from={ 200 } to={ 10000 }
												title={ `${ t('price range') } (грн)` } btnTitle={ t('to apply') }/>
				</div>
			</div>
			<Drawer isOpen={ isOpen } placement='left' onOpenChange={ onOpenChange }>
				<DrawerContent>
					{ () => (
						<>
							<div
								className='filter lg:h-auto w-[calc(100%-70px)] lg:w-64 mr-6 pt-4 lg:pt-0 bg-white lg:bg-transparent'>
								<SwitchTabs section={ section }/>
							</div>
							<div
								className='relative pb-32 lg:pb-4 px-4 pt-4 bg-white border border-gray-200 z-10 overflow-y-auto md:overflow-y-visible'>
								<SwitchTabsByParams subsection={ subsection }/>
								{ subsection === 'byCars' && <ByCar data={ data }/> }
								{ section === Section.Tires && <SectionTires onChange={ onChange } filterData={ filterData } /> }
								{ section === Section.Disks && <SectionDisks onChange={ onChange } filterData={ filterData } /> }
								{ section === Section.Battery && <SectionBattery onChange={ onChange } /> }
								<SelectFromTo name='price' nameMin='minPrice' nameMax='maxPrice' from={ 200 } to={ 10000 }
															title={ `${ t('price range') } (грн)` } btnTitle={ t('to apply') }/>
							</div>
						</>
					) }
				</DrawerContent>
			</Drawer>
		</div>
	)
};

export default FilterAlt;
