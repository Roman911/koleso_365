import { IFilter, Section } from '@/models/filter';
import { parseUrl } from '@/lib/seo';

const special = ['3','4','5','6','9','10','11'];

const paramKeys: Array<keyof IFilter> = [
	'width', 'height', 'radius', 'sezon', 'brand', 'model_id', 'country', 'year', 'omolog',
	'krepeg', 'typedisk', 'colir', 'jemnist', 'puskovii_strum', 'tip_elektrolitu',
	'tip_korpusu', 'napruga', 'poliarnist', 'vehicle_type', 'li', 'si', 'only_studded',
	'only_c', 'only_xl', 'only_owl', 'only_run_flat', 'only_off_road', 'minPrice', 'maxPrice',
	'etMin', 'etMax', 'diaMin', 'diaMax', 'minShirina', 'maxShirina', 'minVisota', 'maxVisota',
	'minDovzina', 'maxDovzina'
];

export const transformUrl = (
	{ section, slug }: { section: Section, slug: string[] }
) => {
	const filter = parseUrl(slug?.join('/') || '');
	const params: string[] = [];

	const updateParamsList = (key: string, value: string | null | undefined) => {
		if(value) params.push(`${key}=${value}`);
	};

	paramKeys.forEach(key => {
		updateParamsList(key, filter[key] ?? '');
	});

	const sectionTypeMap: Record<Section, string> = {
		[Section.Battery]: 'typeproduct=4&',
		[Section.Disks]: 'typeproduct=3&',
		[Section.Tires]: (filter.vehicle_type && special.includes(filter.vehicle_type)) ? 'typeproduct=2&' : '',
		[Section.Car]: '',
	};

	return `${sectionTypeMap[section] || ''}${params.join('&')}`;
};
