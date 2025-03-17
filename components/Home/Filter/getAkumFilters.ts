import { Options } from '@/models/baseData';
import type { AkumProps } from '@/models/akumData';

interface Props {
	data: AkumProps | undefined
}

interface FilterConfigs {
	label: string
	name: string
	focusValue: string
	options: Options[] | undefined
	hidden?: string
}

export const getAkumFilters = ({ data }: Props) => {
	const filterConfigs: FilterConfigs[] = [];

	filterConfigs.push({
		label: 'capacity',
		name: 'jemnist',
		focusValue: '',
		options: data?.jemnist.map(item => ({value: item.value, label: item.value, p: item.p}))
	});

	filterConfigs.push({
		label: 'starting current',
		name: 'puskovii_strum',
		focusValue: '',
		options: data?.['puskovii-strum'].map(item => ({value: item.value, label: item.value, p: item.p}))
	});

	filterConfigs.push({
		label: 'polarity',
		name: 'poliarnist',
		focusValue: '',
		options: data?.poliarnist.map(item => ({value: item.value, label: item.value, p: item.p}))
	});

	filterConfigs.push({
		label: 'length',
		name: 'dovzina',
		focusValue: '',
		options: data?.dovzina.map(item => ({ value: item.value, label: item.value, p: item.p })),
		hidden: 'hidden md:inline-flex'
	});

	filterConfigs.push({
		label: 'width',
		name: 'sirina',
		focusValue: '',
		options: data?.sirina.map(item => ({ value: item.value, label: item.value, p: item.p })),
		hidden: 'hidden md:inline-flex'
	});

	filterConfigs.push({
		label: 'height',
		name: 'visota',
		focusValue: '',
		options: data?.visota.map(item => ({ value: item.value, label: item.value, p: item.p })),
		hidden: 'hidden md:inline-flex'
	});

	filterConfigs.push({
		label: 'brand',
		name: 'brand',
		focusValue: '',
		options: data?.brand_akum?.map(item => ({ value: item.value, label: item.label })),
		hidden: 'md:hidden'
	});

	return filterConfigs;
};
