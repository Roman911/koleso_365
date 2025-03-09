'use client'
import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Autocomplete, AutocompleteItem } from '@heroui/autocomplete';
import type { Options } from '@/models/baseData';
import { Section } from '@/models/filter';

interface SelectProps {
	name: string
	label: string
	isDisabled?: boolean
	focusValue?: string
	options: Options[] | undefined
	onChange: (name: string, value: number | string | null, section: Section) => void
	section: Section
	color?: 'primary' | 'secondary'
}

const MySelect: FC<SelectProps> = ({ name, label, options = [], isDisabled = false, onChange, section, color = 'primary' }) => {
	const t = useTranslations('Select');

	const onSelectionChange = (key: number | string | null) => {
		onChange(name, key, section);
	};

	return <Autocomplete
		color={ color || 'primary' }
		className='max-w-full md:max-w-xs text-white'
		classNames={{
			listboxWrapper: 'rounded-xs',
			base: 'bg-red-500 text-red-500'
		}}
		label={ label }
		isDisabled={ isDisabled }
		onSelectionChange={onSelectionChange}
		radius='none'
		listboxProps={{
			emptyContent: t('no options message'),
		}}
	>
		{ options.map((item) => (
			<AutocompleteItem key={ item.value }>{ item.label }</AutocompleteItem>
		)) }
	</Autocomplete>
};

export default MySelect;
