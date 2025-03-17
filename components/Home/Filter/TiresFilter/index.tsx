'use client'
import { FC } from 'react';
import { useTranslations } from 'next-intl';
import MySelect from '../Select';
import type { FilterProps } from '../filterHomePage';

const TiresFilter: FC<FilterProps> = ({ filters, onChange, section, color }) => {
	const t = useTranslations('Filters');

	return <div className='grid grid-cols-1 md:grid-cols-3 gap-2.5 md:mt-7'>
		{ filters.map(item => {
			return <MySelect
				key={ item.name }
				name={ item.name }
				label={ t(item.label) }
				options={ item.options }
				onChange={ onChange }
				focusValue={ item.focusValue }
				section={ section }
				color={ color }
				hidden={ item.hidden }
			/>
		}) }
	</div>
};

export default TiresFilter;
