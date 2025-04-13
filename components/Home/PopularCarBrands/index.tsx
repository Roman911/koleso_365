'use client';
import { FC } from 'react';
import { Link } from '@/i18n/routing';
import { Button } from '@heroui/button';
import { SettingsProps } from '@/models/settings';
import Title from '@/components/UI/Title';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setCarFilter } from '@/store/slices/filterCarSlice';
import { changeSubsection } from '@/store/slices/filterSlice';
import { Language, LanguageCode } from '@/models/language';
import { Car2BrandProps } from '@/models/featureParams';
import { Subsection } from '@/models/filter';

interface Props {
	locale: Language
	settings: SettingsProps
	popularCarBrands: Car2BrandProps[]
}

const PopularCarBrands: FC<Props> = ({ locale, settings, popularCarBrands }) => {
	const dispatch = useAppDispatch();
	const { filter } = useAppSelector(state => state.filterCarReducer);
	const lang = locale === Language.UK ? LanguageCode.UA : Language.RU;

	const handleClick = (brand: number) => {
		dispatch(setCarFilter({ ...filter, brand }));
		dispatch(changeSubsection(Subsection.ByCars));
	}

	return (
		<div className='mt-28'>
			<Title title={ settings[lang].h2_popular_auto }/>
			<div className='grid grid-cols-2 lg:grid-cols-6 mt-12 gap-5 mb-8'>
				{ popularCarBrands?.map((item, index) => (
					<Link key={ index } className='uppercase font-bold text-blue-500' href='/catalog/tires'>
						<Button color='default' radius='sm' variant='bordered' size='lg' onPress={() => handleClick(item.id)}
										className='text-black font-semibold w-full'>
							{ item.name }
						</Button>
					</Link>
				)) }
			</div>
		</div>
	)
};

export default PopularCarBrands;
