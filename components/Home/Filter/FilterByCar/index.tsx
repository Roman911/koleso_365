'use client'
import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { baseDataAPI } from '@/services/baseDataService';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setCarFilter, setSend } from '@/store/slices/filterCarSlice';
import { changeSubsection } from '@/store/slices/filterSlice';
import MySelect from '../Select';
import { Subsection } from '@/models/section';
import { Section } from '@/models/filter';
import { Button } from '@heroui/button';

interface Props {
	section: Section
	color?: 'primary' | 'secondary'
}

const FilterByCar: FC<Props> = ({ section, color }) => {
	const [ isLoading, setIsLoading ] = useState(false);
	const router = useRouter();
	const locale = useLocale();
	const t = useTranslations('Filters');
	const { filter } = useAppSelector((state) => state.filterCarReducer);
	const dispatch = useAppDispatch();
	const { data } = baseDataAPI.useFetchBaseDataQuery('');
	const { data: model, refetch: modelRefetch } = baseDataAPI.useFetchAutoModelQuery(`${ filter.brand }`);
	const { data: modelYear } = baseDataAPI.useFetchAutoYearQuery(`${ filter.model }`);
	const {
		data: modelKit,
		refetch: modelKitRefetch
	} = baseDataAPI.useFetchAutoModelKitQuery(`${ filter.model }/${ filter.year }`);

	const filters = [
		{
			label: 'car brand',
			name: 'brand',
			options: data?.auto?.map(item => ({ value: item.value, label: item.label }))
		},
		{
			label: 'model',
			name: 'model',
			options: model?.map(item => ({ value: item.value, label: item.label })),
			isDisabled: model?.length === 0,
		},
		{
			label: 'graduation year',
			name: 'year',
			options: modelYear?.map(item => ({ value: item, label: `${ item }` })),
			isDisabled: modelYear?.length === 0,
		},
		{
			label: 'modification',
			name: 'modification',
			options: modelKit?.map(item => ({ value: item.value, label: item.label })),
			isDisabled: modelKit?.length === 0,
		}
	];

	const onChange = (name: string, value: number | string | null) => {
		dispatch(setCarFilter({ ...filter, [name]: value }));
		if(name === 'model') {
			modelRefetch();
		} else if(name === 'modification' || name === 'year') {
			modelKitRefetch();
		}
	}

	const onSubmit = () => {
		setIsLoading(true)
		dispatch(changeSubsection(Subsection.ByCars));
		dispatch(setSend());
		router.push(`/${ locale }/catalog/${ section }`);
	}

	return (
		<>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-2.5 md:mt-7'>
				{ filters.map(item => {
					return <MySelect
						key={ item.name }
						name={ item.name }
						label={ t(item.label) }
						options={ item.options }
						onChange={ onChange }
						isDisabled={ item.isDisabled }
						section={ section }
						color={ color }
					/>
				}) }
			</div>
			<div className='mt-4 md:mt-10'>
				<Button isLoading={ isLoading } size='lg' radius='full' onPress={ onSubmit }
								className='uppercase w-full font-bold bg-white'>
					{ t('choose') }
				</Button>
			</div>
		</>
	)
};

export default FilterByCar;
