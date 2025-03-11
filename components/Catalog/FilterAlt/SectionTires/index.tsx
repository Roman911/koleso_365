import { FC } from 'react';
import { useLocale } from 'next-intl';
import { Subsection } from '@/models/filter';
import Select from '@/components/Catalog/FilterAlt/Select';
import { useAppSelector } from '@/hooks/redux';
import { baseDataAPI } from '@/services/baseDataService';
import type { BaseDataProps } from '@/models/baseData';
import {
	appointmentCargo,
	appointmentIndustrial,
	customTireSeason, others
} from '../customParamForSelector';
import { Language } from '@/models/language';

const cargoTypes = [ '3', '4', '5', '6' ];
const industrialTypes = [ '9', '10', '11' ];

interface Props {
	filterData?: BaseDataProps
	onChange: (name: string, value: number | string | undefined | null, element: HTMLElement) => void
}

const SectionTires: FC<Props> = ({ filterData, onChange }) => {
	const locale = useLocale();
	const { data } = baseDataAPI.useFetchBaseDataQuery('');
	const { filter, subsection } = useAppSelector(state => state.filterReducer);
	const appointmentCargoShow = filter.vehicle_type && cargoTypes.includes(filter.vehicle_type);
	const appointmentIndustrialShow = filter.vehicle_type && industrialTypes.includes(filter.vehicle_type);

	return (
		<>
			{ subsection === Subsection.ByParams && <>
				<Select
					name='width'
					label='width'
					focusValue='175'
					options={ filterData?.tyre_width.map(item => ({ value: item.value, label: item.value, p: item.p })) || []}
					variant='gray'
					onChange={ onChange }
					filterValue={ filter?.width }
					search={ true }
				/>
				<Select
					name='height'
					label='height'
					focusValue='45'
					options={ filterData?.tyre_height?.map(item => ({ value: item.value, label: item.value, p: item.p })) || []}
					variant='gray'
					onChange={ onChange }
					filterValue={ filter?.height }
					search={ true }
				/>
				<Select
					name='radius'
					label='diameter'
					focusValue='R14'
					options={ filterData?.tyre_diameter?.map(item => ({ value: item.value, label: `R${ item.value }`, p: item.p })) || []}
					variant='gray'
					onChange={ onChange }
					filterValue={ filter?.radius }
					search={ true }
				/>
			</> }
			{ !appointmentCargoShow && !appointmentIndustrialShow && <Select
				name='sezon'
				label='season'
				options={ customTireSeason.map(item => ({
					value: item.value,
					label: locale === Language.UK ? item.name_ua : item.name
				}))}
				variant='white'
				onChange={ onChange }
				filterValue={ filter?.sezon }
				valueStudded={ filter?.only_studded }
			/> }
			{ appointmentCargoShow && <Select
				name='vehicle_type'
				label='appointment'
				options={ appointmentCargo.map(item => ({
					value: item.value,
					label: locale === Language.UK ? item.name_ua : item.name
				}))}
				variant='white'
				onChange={ onChange }
				filterValue={ filter?.vehicle_type }
			/> }
			{ appointmentIndustrialShow && <Select
				name='vehicle_type'
				label='appointment'
				options={ appointmentIndustrial.map(item => ({
					value: item.value,
					label: locale === Language.UK ? item.name_ua : item.name
				}))}
				variant='white'
				onChange={ onChange }
				filterValue={ filter?.vehicle_type }
			/> }
			<Select
				name='brand'
				label='brand'
				options={ data?.brand?.map(item => ({ value: item.value, label: item.label })) || []}
				variant='white'
				onChange={ onChange }
				filterValue={ filter?.brand && Number(filter.brand) }
				search={ true }
			/>
			<Select
				name='li'
				label='load index'
				options={ data?.load.map(item => ({ value: item.value, label: item.value })) || []}
				variant='white'
				onChange={ onChange }
				filterValue={ filter?.li }
				search={ true }
			/>
			<Select
				name='si'
				label='speed index'
				options={ data?.speed.map(item => ({ value: item.value, label: item.value })) || []}
				variant='white'
				onChange={ onChange }
				filterValue={ filter?.si }
				search={ true }
			/>
			<Select
				name='omolog'
				label='homologation'
				options={ data?.omolog.map(item => ({ value: item.value, label: item.value })) || []}
				variant='white'
				onChange={ onChange }
				filterValue={ filter?.omolog }
				search={ true }
			/>
			<Select
				name='other'
				label='other'
				options={ others.map(item => ({ value: item.value, label: locale === Language.UK ? item.name_ua : item.name })) || []}
				variant='white'
				onChange={ onChange }
				filterOther={{
					only_c: filter?.only_c ?? null,
					only_xl: filter?.only_xl ?? null,
					only_owl: filter?.only_owl ?? null,
					only_run_flat: filter?.only_run_flat ?? null,
					only_off_road: filter?.only_off_road ?? null,
				}}
			/>
		</>
	)
};

export default SectionTires;
