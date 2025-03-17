'use client'
import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import { Autocomplete, AutocompleteItem, AutocompleteSection } from '@heroui/autocomplete';
import type { Options } from '@/models/baseData';
import { Section } from '@/models/filter';
import { POPULAR_SIZE } from '@/etc/const';
import './index.css';

const popularSize = ['width', 'height', 'radius'];

interface SelectProps {
	name: string
	label: string
	isDisabled?: boolean
	focusValue?: string
	options: Options[] | undefined
	onChange: (name: string, value: number | string | null, section: Section) => void
	section: Section
	color?: 'primary' | 'secondary'
	hidden?: string
}

const MySelect: FC<SelectProps> = ({ name, label, options = [], isDisabled = false, onChange, section, color = 'primary', hidden = '' }) => {
	const t = useTranslations('Select');
	const popularSizeOptions =
		section === Section.Tires ? popularSize.includes(name) && POPULAR_SIZE[name]
			: section === Section.Battery && name === 'jemnist' && POPULAR_SIZE[name];

	const onSelectionChange = (key: number | string | null) => {
		onChange(name, key, section);
	};

	return <Autocomplete
		color={ color || 'primary' }
		className={ twMerge('max-w-full md:max-w-xs', hidden ) }
		classNames={{
			popoverContent: 'rounded-none',
			selectorButton: 'text-black',
			base: 'autocomplete-section'
		}}
		label={ <span className='text-black'>{ label }</span> }
		isDisabled={ isDisabled }
		onSelectionChange={onSelectionChange}
		radius='none'
		listboxProps={{
			emptyContent: t('no options message'),
		}}
	>
		{ popularSizeOptions ? <>
			<AutocompleteSection classNames={{ heading: 'text-medium font-bold text-black' }} title={ t('popular') }>
				{ popularSizeOptions.map((item) => (
					<AutocompleteItem key={ item.value }>{ item.label }</AutocompleteItem>
				)) }
			</AutocompleteSection>
			<AutocompleteSection classNames={{ heading: 'text-medium font-bold text-black' }} title={ t('all') }>
				{ options.map((item) => (
					<AutocompleteItem key={ item.value }>{ item.label }</AutocompleteItem>
				)) }
			</AutocompleteSection>
		</> : options.map((item) => (
			<AutocompleteItem key={ item.value }>{ item.label }</AutocompleteItem>
		)) }
	</Autocomplete>
};

export default MySelect;
