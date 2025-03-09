'use client'
import { useTranslations, useLocale } from 'next-intl';
import { baseDataAPI } from '@/services/baseDataService';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setWirehouse } from '@/store/slices/orderSlice';
import { Language } from '@/models/language';
import MySelect from '@/components/UI/Select';

export const NpWarehousesSearch = () => {
	const t = useTranslations('Select');
	const locale = useLocale();
	const { city } = useAppSelector(state => state.orderReducer);
	const dispatch = useAppDispatch();
	const { data } = baseDataAPI.useFetchNpWarehousesQuery(city.value);

	const warehousesOptions = data?.map((item: { Description: string, DescriptionRu: string, Ref: string }) => {
		return { value: item.Ref, label: locale === Language.UK ? item.Description : item.DescriptionRu }
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
