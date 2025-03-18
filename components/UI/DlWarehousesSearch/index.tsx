'use client'
import { useTranslations} from 'next-intl';
import { baseDataAPI } from '@/services/baseDataService';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setWirehouse } from '@/store/slices/orderSlice';
import MySelect from '@/components/UI/Select';

export const DlWarehousesSearch = () => {
	const t = useTranslations('Select');
	const { city } = useAppSelector(state => state.orderReducer);
	const dispatch = useAppDispatch();
	const dlCity = baseDataAPI.useFetchDlSearchQuery(city.label)
	const { data } = baseDataAPI.useFetchDlWarehousesQuery(dlCity ? dlCity?.data?.[0].id : '');

	const warehousesOptions = data?.map((item: { id: string, address: string }) => {
		return { value: item.id, label: item.address }
	});

	const onChange = (_: string, value?: number | string | null, label?: number | string | null) => {
		const normalizedValue = value?.toString() ?? '';
		const normalizedLabel = label?.toString() ?? '';
		dispatch(setWirehouse({ value: normalizedValue, label: normalizedLabel }));
	};

	return <MySelect
		name='department'
		label={ t('department') }
		options={ warehousesOptions }
		onChange={ onChange }
	/>
};
