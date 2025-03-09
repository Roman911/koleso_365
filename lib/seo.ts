import { IFilter, OriginalType } from '@/models/seo';

const paramTrans: OriginalType = {
	w: 'width',
	h: 'height',
	d: 'radius',
	b: 'brand',
	s: 'sezon',
	stud: 'only_studded',
	m: 'model_id',
	ctr: 'country',
	y: 'year',
	hm: 'omolog',
	kr: 'krepeg',
	td: 'typedisk',
	clr: 'colir',
	ct: 'jemnist',
	sk: 'puskovii_strum',
	elt: 'tip_elektrolitu',
	tk: 'tip_korpusu',
	am: 'napruga',
	pl: 'poliarnist',
	vt: 'vehicle_type',
	li: 'li',
	si: 'si',
	oc: 'only_c',
	xl: 'only_xl',
	owl: 'only_owl',
	rf: 'only_run_flat',
	ofr: 'only_off_road',
	pfrom: 'minPrice',
	pto: 'maxPrice',
	etfrom: 'etMin',
	etto: 'etMax',
	diafrom: 'diaMin',
	diato: 'diaMax',
	wfrom: 'minShirina',
	wto: 'maxShirina',
	hfrom: 'minVisota',
	hto: 'maxVisota',
	lngfrom: 'minDovzina',
	lngto: 'maxDovzina',
};

const paramsTransForURL: IFilter = Object.fromEntries(
	Object.entries(paramTrans).map(([key, value]) => [value, key])
) as IFilter;

export const generateUrl = (filter: IFilter): string => {
	const parts = Object.entries(filter).reduce<string[]>((acc, [key, value]) => {
		if (value) {
			const formattedValue = Array.isArray(value) ? value.join(',') : String(value);
			const urlParamKey = paramsTransForURL[key as keyof IFilter];
			if (urlParamKey) {
				acc.push(`${urlParamKey}-${formattedValue}`);
			}
		}
		return acc;
	}, []);

	return parts.join('/');
};

type ParsedResult = {
	[key: string]: string;
};

export const parseUrl = (url: string): ParsedResult => {
	const result: ParsedResult = {};

	url.split('/').forEach(item => {
		const [name, value] = item.split('-');
		const paramName = paramTrans[name as keyof typeof paramTrans];
		if (paramName) {
			result[paramName] = value || '';
		}
	});

	return result;
};
