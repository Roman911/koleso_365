'use client'
import { Link } from '@/i18n/routing';
import { FC, useEffect, useState } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import { Tooltip } from '@heroui/tooltip';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { addBrandAlias, addModelAlias, reset } from '@/store/slices/brandAliasSlice';
import * as Icons from '../../UI/Icons';
import { SeasonTransform, VehicleTypeTransform } from '@/lib/characteristicsTransform';
import Comments from '../Comments';
import type { ProductProps } from '@/models/product';
import { Language, LanguageCode } from '@/models/language';

const tabs = [
	{ label: 'main characteristics' },
	{ label: 'description' },
	{ label: 'reviews' }
];

interface CharacteristicsBlockProps {
	locale: Language
	data: ProductProps | undefined
}

const CharacteristicsBlock: FC<CharacteristicsBlockProps> = ({ locale, data }) => {
	const t = useTranslations('Filters');
	const [ tab, setTab ] = useState('main characteristics');
	const [ showOptions, setShowOptions ] = useState(false);
	const { section } = useAppSelector(state => state.filterReducer);
	const description = data?.data.descr[locale === Language.UK ? LanguageCode.UA : Language.RU]?.description;
	const vehicleType = data?.data.offer_group.vehicle_type;
	const vehicleTransform = vehicleType ? VehicleTypeTransform(vehicleType) : undefined;
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(reset());
	}, [ dispatch ]);

	const link = (to: string) => {
		if(section === 'tires') {
			return `/catalog/tires${ to }`
		} else if(section === 'disks') {
			return `/catalog/disks${ to }`
		} else {
			return `/catalog/battery${ to }`
		}
	};

	const HtmlContent = ({ htmlString }: { htmlString: string }) => {
		const sanitizedHtml = DOMPurify.sanitize(htmlString, {
			ADD_TAGS: [ 'iframe' ],
			ADD_ATTR: [ 'allow', 'allowfullscreen', 'frameborder', 'scrolling', 'loading', 'referrerpolicy' ]
		});

		return <div dangerouslySetInnerHTML={ { __html: sanitizedHtml } }/>;
	};

	return <section className='mt-8 md:mt-16'>
		<div className='gap-x-2.5 border-b border-[#E0E4E8] hidden md:flex'>
			{ tabs.map((item, index) => {
				return <button
					key={ index }
					onClick={ () => setTab(item.label) }
					className={
						twMerge('py-4 px-5 rounded-t text-sm font-bold uppercase focus:outline-none focus:shadow-outline-blue transition-all duration-300 bg-zinc-200 text-[#575C66]',
							tab === item.label && 'bg-[#171719] text-white')
					}>
					{ t(item.label) }
				</button>
			}) }
		</div>
		<div className='relative text-left md:hidden'>
			<button type='button' onClick={ () => setShowOptions(prev => !prev) }
							className='flex items-center w-full justify-between px-3.5 py-2 bg-white border border-[#CDD0D9] rounded-sm font-medium'
							id='menu-button'>
				{ t(tab) }
				<div className={ twMerge('transition-transform', showOptions && 'rotate-180') }>
					<Icons.ChevronDownIcon className='stroke-black'/>
				</div>
			</button>
			<div
				className={
				twMerge('absolute left-0 z-10 w-full border border-[#CDD0D9] bg-white shadow-lg rounded-sm', !showOptions && 'hidden') }
				tabIndex={ -1 }>
				<div className="text-black px-3.5 py-2">
					{ tabs.map((item, index) => {
						return <button
							key={ index }
							onClick={ () => {
								setTab(item.label);
								setShowOptions(false);
							} }
							className='w-full text-start py-2 font-medium'
						>
							{ t(item.label) }
						</button>
					}) }
				</div>
			</div>
		</div>
		{ tab === 'main characteristics' && <div className='flex flex-col md:flex-row my-6 md:my-4 md:gap-10'>
			<div className='flex-1'>
				{ data?.data.offer_group.width && <div className='flex md:my-4 text-sm font-medium'>
					<div
						className='w-full flex items-center text-[#575C66] after:flex-1 after:min-w-6 after:border-b after:border-dashed after:border-[#AEB6C2] after:h-px after:mt-3 after:mx-2'>
						<Tooltip content={ locale === Language.UK ? `Ширина ${ section === 'tires' ? 'шини в міліметрах' : 'диска в дюймах' }` :
							`Ширина ${ section === 'tires' ? 'шины в миллиметрах' : 'диска в дюймах' }` }>
							<div className='flex gap-x-0.5'>
								<Icons.InfoTooltipIcon className='fill-[#AEB6C2]' />{ t('width') }
							</div>
						</Tooltip>
					</div>
					<Link href={ link(`/w-${ data?.data.offer_group.width }`) }
								className='text-black max-w-max w-full hover:underline'>
						{ data?.data.offer_group.width }
					</Link>
				</div> }
				{ data?.data.offer_group.height && <div className='flex my-4 text-sm font-medium'>
					<div
						className='w-full flex items-center text-[#575C66] after:flex-1 after:min-w-6 after:border-b after:border-dashed after:border-[#AEB6C2] after:h-px after:mt-3 after:mx-2'>
						<Tooltip content={ locale === Language.UK ?
							'Висота шини у відсотках від ширини, якщо висота зазначена, вважається рівною 82' :
							'Высота шины в процентах от ширины, если высота указана, считается равной 82' }>
							<div className='flex gap-x-0.5'>
								<Icons.InfoTooltipIcon className='fill-[#AEB6C2]' />{ t('height') }
							</div>
						</Tooltip>
					</div>
					<Link href={ link(`/h-${ data?.data.offer_group.height }`) }
								className='text-black max-w-max w-full hover:underline'>
						{ data?.data.offer_group.height }
					</Link>
				</div> }
				{ data?.data.offer_group.diameter && <div className='flex my-4 text-sm font-medium'>
					<div
						className='w-full flex items-center text-[#575C66] after:flex-1 after:min-w-6 after:border-b after:border-dashed after:border-[#AEB6C2] after:h-px after:mt-3 after:mx-2'>
						<Tooltip content={ locale === Language.UK ?
							`${ section === 'tires' ? 'Внутрішній діаметр шини' : 'Діаметр диска' } в дюймах` :
							`${ section === 'tires' ? 'Внутренний диаметр шины' : 'Диаметр диска' } в дюймах` }>
							<div className='flex gap-x-0.5'>
								<Icons.InfoTooltipIcon className='fill-[#AEB6C2]' />{ t('diameter') }
							</div>
						</Tooltip>
					</div>
					<Link href={ link(`/d-${ data?.data.offer_group.diameter }`) }
								className='text-black max-w-max w-full hover:underline'>
						{ data?.data.offer_group.diameter }
					</Link>
				</div> }
				{ data?.data.offer_group.krep_pcd1 && <div className='flex my-4 text-sm font-medium'>
					<div
						className='w-full flex items-center text-[#575C66] after:flex-1 after:min-w-6 after:border-b after:border-dashed after:border-[#AEB6C2] after:h-px after:mt-3 after:mx-2'>
						<Tooltip content={ locale === Language.UK ?
							'Кількість кріпильних отворів' :
							'Количество крепежных отверстий' }>
							<div className='flex gap-x-0.5'>
								<Icons.InfoTooltipIcon className='fill-[#AEB6C2]' />{ t('fasteners') }
							</div>
						</Tooltip>
					</div>
					<Link href={ link(`/kr-${ data?.data.offer_group.krep_pcd1 }`) }
								className='text-black max-w-max w-full hover:underline'>
						{ data?.data.offer_group.krep_pcd1 }
					</Link>
				</div> }
				{ data?.data.offer_group.speed_index && <div className='flex my-4 text-sm font-medium'>
					<div
						className='w-full flex items-center text-[#575C66] after:flex-1 after:min-w-6 after:border-b after:border-dashed after:border-[#AEB6C2] after:h-px after:mt-3 after:mx-2'>
						{ t('speed index') }
					</div>
					<Link href={ link(`/si-${ data?.data.offer_group.speed_index }`) }
								className='text-black max-w-max w-full hover:underline'>
						{ locale === Language.UK ? data?.data.offer_group.speed_index : data?.data.offer_group.speed_index_ru }
					</Link>
				</div> }
				{ data?.data.offer_group.load_index && <div className='flex my-4 text-sm font-medium'>
					<div
						className='w-full flex items-center text-[#575C66] after:flex-1 after:min-w-6 after:border-b after:border-dashed after:border-[#AEB6C2] after:h-px after:mt-3 after:mx-2'>
						{ t('load index') }
					</div>
					<Link href={ link(`/li-${ data?.data.offer_group.load_index }`) }
								className='text-black max-w-max w-full hover:underline'>
						{ locale === Language.UK ? data?.data.offer_group.load_index : data?.data.offer_group.load_index_ru }
					</Link>
				</div> }
			</div>
			<div className='flex-1'>
				{ <div className='flex md:my-4 text-sm font-medium'>
					<div
						className='w-full flex items-center text-[#575C66] after:flex-1 after:min-w-6 after:border-b after:border-dashed after:border-[#AEB6C2] after:h-px after:mt-3 after:mx-2'>
						{ t('brand') }
					</div>
					<Link href={ link(`/b-${ data?.data.brand.id }`) }
								onClick={ () => dispatch(addBrandAlias(data ? data?.data.brand.alias : '')) }
								className='text-black max-w-max w-full hover:underline'>
						{ data?.data.brand.name }
					</Link>
				</div> }
				{ data?.data.model.name && <div className='flex my-4 text-sm font-medium'>
					<div
						className='w-full flex items-center text-[#575C66] after:flex-1 after:min-w-6 after:border-b after:border-dashed after:border-[#AEB6C2] after:h-px after:mt-3 after:mx-2'>
						{ t('model') }
					</div>
					<Link href={ link(`/b-${ data?.data.brand.id }/m-${ data?.data.model.id }`) }
								onClick={ () => dispatch(addModelAlias(data ? data?.data.model.alias : '')) }
								className='text-black max-w-max w-full hover:underline'>
						{ data?.data.model.name }
					</Link>
				</div> }
				{ vehicleType && <div className='flex my-4 text-sm font-medium'>
					<div
						className='w-full flex items-center text-[#575C66] after:flex-1 after:min-w-6 after:border-b after:border-dashed after:border-[#AEB6C2] after:h-px after:mt-3 after:mx-2'>
						{ t('appointment') }
					</div>
					<Link href={ `/vt-${ vehicleType }` } className='text-black'>
						{ t(vehicleTransform?.name || '') }
					</Link>
				</div> }
				{ data?.data.model.season && <div className='flex my-4 text-sm font-medium'>
					<div
						className='w-full flex items-center text-[#575C66] after:flex-1 after:min-w-6 after:border-b after:border-dashed after:border-[#AEB6C2] after:h-px after:mt-3 after:mx-2'>
						Сезон
					</div>
					<Link href={ link(`/s-${ data?.data.model.season }`) }
								className='text-black max-w-max w-full hover:underline'>
						{ t(SeasonTransform(data?.data.model.season)?.name || '') }
					</Link>
				</div> }
				{ data?.data.offer_group.et && <div className='flex my-4 text-sm font-medium'>
					<div
						className='w-full flex items-center text-[#575C66] after:flex-1 after:min-w-6 after:border-b after:border-dashed after:border-[#AEB6C2] after:h-px after:mt-3 after:mx-2'>
						ET
					</div>
					<Link href={ link(`/et-${ data?.data.offer_group.et }`) }
								className='text-black max-w-max w-full hover:underline'>
						{ data?.data.offer_group.et }
					</Link>
				</div> }
				{ data?.data.offer_group.dia && <div className='flex my-4 text-sm font-medium'>
					<div
						className='w-full flex items-center text-[#575C66] after:flex-1 after:min-w-6 after:border-b after:border-dashed after:border-[#AEB6C2] after:h-px after:mt-3 after:mx-2'>
						DIA
					</div>
					<Link href={ link(`/dia-${ data?.data.offer_group.dia }`) }
								className='text-black max-w-max w-full hover:underline'>
						{ data?.data.offer_group.dia }
					</Link>
				</div> }
				{ section === 'tires' && <div className='flex my-4 text-sm font-medium'>
					<div
						className='w-full flex items-center text-[#575C66] after:flex-1 after:min-w-6 after:border-b after:border-dashed after:border-[#AEB6C2] after:h-px after:mt-3 after:mx-2'>
						{ t('type size') }
					</div>
					<Link
						href={ link(`/w-${ data?.data.offer_group.width }/h-${ data?.data.offer_group.height }/d-${ data?.data.offer_group.diameter }`) }
						className='text-black max-w-max w-full hover:underline'>
						{ `${ data?.data.offer_group.width }/${ data?.data.offer_group.height } R${ data?.data.offer_group.diameter }` }
					</Link>
				</div> }
			</div>
		</div> }
		{ tab === 'description' && <div className='my-5 md:my-6 leading-7'>
			{ description && <HtmlContent htmlString={ description }/> }
		</div> }
		{ tab === 'reviews' && <Comments
			review={ data?.data.review }
			model_id={ data?.data.model.id }
			product_id={ data?.data.id }
			trc_id={ data?.data.trc_id }
		/> }
	</section>
};

export default CharacteristicsBlock;
