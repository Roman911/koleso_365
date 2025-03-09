import { FC } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Subsection } from '@/models/filter';
import Select from '@/components/Catalog/FilterAlt/Select';
import { baseDataAPI } from '@/services/baseDataService';
import { useAppSelector } from '@/hooks/redux';
import type { BaseDataProps } from '@/models/baseData';
import { SelectFromTo } from '@/components/Catalog/FilterAlt/SelectFromTo';
import { typeDisc } from '@/components/Catalog/FilterAlt/customParamForSelector';
import { Language } from '@/models/language';

interface Props {
	filterData?: BaseDataProps
	onChange: (name: string, value: number | string | undefined | null, element: HTMLElement) => void
}

const SectionDisks: FC<Props> = ({ filterData, onChange }) => {
	const t = useTranslations('Filters');
	const locale = useLocale();
	const { data } = baseDataAPI.useFetchBaseDataQuery('');
	const { filter, subsection } = useAppSelector(state => state.filterReducer);

	return (
		<>
			{ subsection === Subsection.ByParams && <>
				<Select
					name='width'
					label='width'
					options={ filterData?.disc_width?.map(item => ({ value: item.value, label: item.value, p: item.p })) || []}
					variant='gray'
					onChange={ onChange }
					filterValue={ filter?.width }
					search={ true }
				/>
				<Select
					name='radius'
					label='diameter'
					options={ filterData?.disc_diameter?.map(item => ({ value: item.value, label: `R${ item.value }`, p: item.p })) || []}
					variant='gray'
					onChange={ onChange }
					filterValue={ filter?.radius }
					search={ true }
				/>
			</> }
			<Select
				name='krepeg'
				label='fasteners'
				options={ data?.krip?.map(item => ({ value: item.value, label: item.value, p: item.p })) || []}
				variant='white'
				onChange={ onChange }
				filterValue={ filter?.krepeg }
				search={ true }
			/>
			<SelectFromTo name='et' nameMin='etMin' nameMax='etMax' minus={ true } from={ -140 } to={ 500 }
										title={ `ET(${ t('departure') })` } btnTitle={ t('to apply') }/>
			<SelectFromTo name='dia' nameMin='diaMin' nameMax='diaMax' from={ 46 } to={ 500 } title='DIA'
										btnTitle={ t('to apply') }/>
			<Select
				name='typedisk'
				label='type'
				options={ typeDisc.map(item => ({ value: item.value, label: locale === Language.UK ? item.name_ua : item.name })) || []}
				variant='gray'
				onChange={ onChange }
				filterValue={ filter?.typedisk }
			/>
			<Select
				name='colir'
				label='color'
				options={ data?.colir_abbr?.map(item => ({ value: item.value, label: item.value, p: item.p })) || []}
				variant='gray'
				onChange={ onChange }
				filterValue={ filter?.colir }
				search={ true }
			/>
			<Select
				name='brand'
				label='brand'
				options={ data?.brand_disc?.map(item => ({ value: item.value, label: item.label })) || []}
				variant='white'
				onChange={ onChange }
				filterValue={ filter?.brand && Number(filter.brand) }
				search={ true }
			/>
		</>
	)
};

export default SectionDisks;
