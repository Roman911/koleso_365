import { FC } from 'react';
import { useTranslations } from 'next-intl';
import MySelect from '@/components/UI/Select';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import type { BaseDataProps } from '@/models/baseData';
import { setCarFilter } from '@/store/slices/filterCarSlice';
import { baseDataAPI } from '@/services/baseDataService';

interface Auto {
	label: string
	value: number
}

interface Props {
	data: BaseDataProps | undefined
}

const ByCar: FC<Props> = ( data ) => {
	const t = useTranslations('Filters');
	const dispatch = useAppDispatch();
	const { filter } = useAppSelector(state => state.filterCarReducer);
	const { filter: filterCar } = useAppSelector(state => state.filterCarReducer);
	const { data: model, refetch: modelRefetch } = baseDataAPI.useFetchAutoModelQuery(`${filter.brand}`);
	const { data: modelYear } = baseDataAPI.useFetchAutoYearQuery(`${filter.model}`);
	const { data: modelKit, refetch: modelKitRefetch } = baseDataAPI.useFetchAutoModelKitQuery(`${filter.model}/${filter.year}`);

	const onChangeByCar = (name: string, value: number | string | null) => {
		dispatch(setCarFilter({ ...filter, [name]: value }));
		if(name === 'model') {
			modelRefetch();
		} else if(name === 'modification' || name === 'year') {
			modelKitRefetch();
		}
	}

	return (
		<>
			<div className='mt-2'>
				{ <MySelect
					name='brand'
					label={ t('car brand') }
					options={ data.data?.auto?.map(item => ({ value: item.value, label: item.label })) }
					onChange={ onChangeByCar }
					defaultValue={ filterCar?.brand ? data.data?.auto?.find((i: Auto) => i.value === filterCar.brand) : undefined }
				/> }
			</div>
			<div className='mt-2'>
				<MySelect
					name='model'
					label={ t('model') }
					options={ model?.map(item => ({ value: item.value, label: item.label })) }
					isDisabled={ model?.length === 0 }
					onChange={ onChangeByCar }
					defaultValue={ filterCar?.model ? model?.find(i => i.value === filterCar.model) : undefined }
				/>
			</div>
			<div className='mt-2'>
				<MySelect
					name='year'
					label={ t('graduation year') }
					options={ modelYear?.map(item => ({ value: item, label: `${item}` })) }
					isDisabled={ modelYear?.length === 0 }
					onChange={ onChangeByCar }
					defaultValue={ filterCar?.year ? { value: `${filterCar?.year}`, label: `${filterCar?.year}` } : undefined }
				/>
			</div>
			<div className='mt-2'>
				<MySelect
					name='modification'
					label={ t('modification') }
					options={ modelKit?.map(item => ({ value: item.value, label: item.label })) }
					isDisabled={ modelKit?.length === 0 }
					onChange={ onChangeByCar }
					defaultValue={ filterCar?.modification ? modelKit?.find(i => i.value === filterCar.modification) : undefined }
				/>
			</div>
		</>
	)
};

export default ByCar;
