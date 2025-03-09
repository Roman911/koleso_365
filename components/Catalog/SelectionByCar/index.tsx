'use client'
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useAppSelector } from '@/hooks/redux';
import { baseDataAPI } from '@/services/baseDataService';
import { Section, Subsection } from '@/models/filter';

const SelectionByCar = () => {
	const t = useTranslations('Main');
	const { section, subsection } = useAppSelector(state => state.filterReducer);
	const { filter } = useAppSelector(state => state.filterCarReducer);
	const { data } = baseDataAPI.useFetchKitTyreSizeQuery(`${filter.modification}`);
	const { data: diskSize } = baseDataAPI.useFetchKitDiskSizeQuery(`${filter.modification}`);

	if(subsection === Subsection.ByParams || data?.length === 0) return null;

	return <div className='mb-5 border-y py-4'>
		<div className='text-gray-500'>Ваш авто:</div>
		<div className='font-bold mt-2'>
			{ `${ data?.[0].kits.car2_model.car2_brand.name } ${ data?.[0].kits.car2_model.name } ${ data?.[0].kits.name } (${ data?.[0].kits.year })` }
		</div>
		<h6 className='text-gray-500 mt-4'>
			{ t('factory') }
		</h6>
		<div className='flex gap-2 text-sm font-bold mt-2'>
			{section === Section.Tires ? data?.filter(i => i.type === 1).map(item => {
				return <Link className='text-primary' key={ item.value } href={ `/catalog/${section}/w-${ item.width }/h-${ item.height }/d-${ item.diameter }` } >
					{ `${ item.width }/${ item.height } R${ item.diameter }` }
				</Link>
			}) : diskSize?.filter(i => i.type === 1).map(item => {
				return <Link className='text-primary' key={ item.value } href={ `/catalog/${section}/w-${ item.width }/d-${ item.diameter }/kr-${ item.kits.bolt_count }x${ item.kits.pcd }/et-${ item.et }/dia-${ item.kits.dia }` } >
					{ `${ item.width }x${ item.diameter } ${ item.kits.bolt_count }x${ item.kits.pcd } ET${ item.et } DIA${ item.kits.dia }` }
				</Link>})}
		</div>
		<h6 className='text-gray-500 mt-4'>Альтернатива</h6>
		<div className='flex flex-wrap gap-2 text-sm font-bold mt-2'>
			{section === Section.Tires ? data?.filter(i => i.type === 2).map(item => {
				return <Link className='text-primary' key={ item.value } href={ `/catalog/${section}/w-${ item.width }/h-${ item.height }/d-${ item.diameter }` } >
					{ `${ item.width }/${ item.height } R${ item.diameter }` }
				</Link>
			}) : diskSize?.filter(i => i.type === 2).map(item => {
				return <Link className='text-primary' key={ item.value } href={ `/catalog/${section}/w-${ item.width }/d-${ item.diameter }/kr-${ item.kits.bolt_count }x${ item.kits.pcd }/et-${ item.et }/dia-${ item.kits.dia }` } >
					{ `${ item.width }x${ item.diameter } ${ item.kits.bolt_count }x${ item.kits.pcd } ET${ item.et } DIA${ item.kits.dia }` }
				</Link>})}
		</div>
	</div>
};

export default SelectionByCar;
