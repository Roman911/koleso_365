import { useCallback, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppSelector } from './redux';
import { IFilter } from '@/models/filter';
import { OriginalType } from '@/models/seo';

type FilterEntries = [ keyof OriginalType, IFilter[keyof IFilter] ];

export const useAppSubmit = () => {
	const [ params, setParams ] = useState<string[]>([]);
	const paramsNavigate = useParams<{ locale: string, section: string, slug: string[] }>();
	const { locale, section, slug } = paramsNavigate;
	const router = useRouter();
	const { filter } = useAppSelector(state => state.filterReducer);

	// General function to update params list
	const updateParamsList = useCallback((key: string, value: string | null | undefined) => {
		setParams(prevParams => {
			const updatedParams = prevParams.filter(param => !param.startsWith(`${ key }-`));
			if(value) updatedParams.push(`${ key }-${ value }`);
			return updatedParams;
		});
	}, []);

	// Update params when filter changes
	useEffect(() => {
		const paramEntries: FilterEntries[] = [
			[ 'w', filter.width ], [ 'h', filter.height ], [ 'b', filter.brand ], [ 'd', filter.radius ],
			[ 's', filter.sezon ], [ 'stud', filter.only_studded ], [ 'm', filter.model_id ],
			[ 'ctr', filter.country ], [ 'y', filter.year ], [ 'hm', filter.omolog ], [ 'kr', filter.krepeg ],
			[ 'td', filter.typedisk ], [ 'clr', filter.colir ], [ 'ct', filter.jemnist ],
			[ 'sk', filter.puskovii_strum ], [ 'elt', filter.tip_elektrolitu ], [ 'tk', filter.tip_korpusu ],
			[ 'am', filter.napruga ], [ 'pl', filter.poliarnist ], [ 'vt', filter.vehicle_type ],
			[ 'li', filter.li ], [ 'si', filter.si ], [ 'oc', filter.only_c ], [ 'xl', filter.only_xl ],
			[ 'owl', filter.only_owl ], [ 'rf', filter.only_run_flat ], [ 'ofr', filter.only_off_road ],
			[ 'pfrom', filter.minPrice ], [ 'pto', filter.maxPrice ], [ 'etfrom', filter.etMin ],
			[ 'etto', filter.etMax ], [ 'diafrom', filter.diaMin ], [ 'diato', filter.diaMax ],
			[ 'wfrom', filter.minShirina ], [ 'wto', filter.maxShirina ], [ 'hfrom', filter.minVisota ],
			[ 'hto', filter.maxVisota ], [ 'lngfrom', filter.minDovzina ], [ 'lngto', filter.maxDovzina ],
		];

		paramEntries.forEach(([ key, value ]) => {
			updateParamsList(key, value ?? '');
		});
	}, [ filter, updateParamsList ]);

	const handleSubmit = useCallback(() => {
		const joinedParams = `${ params.join('/') }`;

		if(slug?.join('/') !== joinedParams) {
			router.push(`/${ locale }/catalog/${ section }/${ joinedParams }`)
		}
	}, [ locale, params, router, section, slug ]);

	return { params, handleSubmit };
};
