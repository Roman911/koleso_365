import { FC } from 'react';
import { useTranslations } from 'next-intl';
import Select from '@/components/Catalog/FilterAlt/Select';
import { useAppSelector } from '@/hooks/redux';
import { baseDataAPI } from '@/services/baseDataService';
import { SelectFromTo } from '@/components/Catalog/FilterAlt/SelectFromTo';

interface Props {
	onChange: (name: string, value: number | string | undefined | null, element: HTMLElement) => void
}

const SectionBattery: FC<Props> = ({ onChange }) => {
	const t = useTranslations('Filters');
	const { filter } = useAppSelector(state => state.filterReducer);
	const { data: dataAkum } = baseDataAPI.useFetchDataAkumQuery('');

	return (
		<>
			<Select
				name='jemnist'
				label='capacity ah'
				options={ dataAkum?.jemnist.map(item => ({value: item.value, label: item.value, p: item.p})) || []}
				variant='gray'
				onChange={ onChange }
				filterValue={ filter?.jemnist }
				search={ true }
			/>
			<Select
				name='puskovii_strum'
				label='starting current a'
				options={ dataAkum?.['puskovii-strum'].map(item => ({value: item.value, label: item.value, p: item.p})) || []}
				variant='gray'
				onChange={ onChange }
				filterValue={ filter?.puskovii_strum }
				search={ true }
			/>
			<Select
				name='tip_elektrolitu'
				label='type akb'
				options={ dataAkum?.['tip-elektrolitu'].map(item => ({value: item.value, label: item.value, p: item.p})) || []}
				variant='gray'
				onChange={ onChange }
				filterValue={ filter?.tip_elektrolitu }
				search={ true }
			/>
			<Select
				name='tip_korpusu'
				label='body type'
				options={ dataAkum?.['tip-korpusu'].map(item => ({value: item.value, label: item.p, p: item.p})) || []}
				variant='white'
				onChange={ onChange }
				filterValue={ filter?.tip_korpusu }
			/>
			<Select
				name='brand'
				label='brand'
				options={ dataAkum?.brand_akum?.map(item => ({value: item.value, label: item.label})) || []}
				variant='white'
				onChange={ onChange }
				filterValue={ filter?.brand && Number(filter.brand) }
				search={ true }
			/>
			<SelectFromTo name='sirina' nameMin='minShirina' nameMax='maxShirina' from={0} to={600} title={`${t('width')} (см)`}
										btnTitle={t('to apply')} />
			<SelectFromTo name='visota' nameMin='minVisota' nameMax='maxVisota' from={0} to={190} title={`${t('height')} (см)`}
										btnTitle={t('to apply')} />
			<SelectFromTo name='dovzina' nameMin='minDovzina' nameMax='maxDovzina' from={0} to={600}
										title={`${t('length')} (см)`} btnTitle={t('to apply')} />
			<Select
				name='napruga'
				label='high-voltage v'
				options={ dataAkum?.napruga.map(item => ({value: item.value, label: item.value, p: item.p})) || []}
				variant='gray'
				onChange={ onChange }
				filterValue={ filter?.napruga }
			/>
			<Select
				name='poliarnist'
				label='polarity'
				options={ dataAkum?.poliarnist.map(item => ({value: item.value, label: item.p, p: item.p})) || []}
				variant='white'
				onChange={ onChange }
				filterValue={ filter?.poliarnist }
			/>
		</>
	)
};

export default SectionBattery;
