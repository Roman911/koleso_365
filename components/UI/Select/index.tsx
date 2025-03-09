import { Dispatch, FC, SetStateAction } from 'react';
import { Autocomplete, AutocompleteItem } from '@heroui/autocomplete';
import { useTranslations } from 'next-intl';
import type { Options } from '@/models/baseData';

interface SelectProps {
	name: string
	label: string
	isDisabled?: boolean
	setState?: Dispatch<SetStateAction<string | undefined>>
	options: Options[] | undefined
	onChange: (name: string, value: number | string | null, label?: number | string | null) => void
	defaultValue?: Options | undefined
}

const MySelect: FC<SelectProps> = (
	{
		name,
		label,
		options = [],
		isDisabled = false,
		onChange,
		setState
	}) => {
	const t = useTranslations('Select');

	const handleChange = (key: number | string | null) => {
		const label = key ? options.find(i => i.value === key) : {label: ''};
		onChange(name, key, label?.label);
	}

	const handleInputChange = (value: string) => {
		const cleanedText = value.replace(/[^а-яА-ЯіїєґІЇЄҐ' ]/g, '');
		if(setState) setState(cleanedText?.toString());
	}

	return <Autocomplete
		onInputChange={handleInputChange}
		className='max-w-full md:max-w-full'
		classNames={ {
			listboxWrapper: 'rounded-xs'
		} }
		label={ label }
		isDisabled={ isDisabled }
		onSelectionChange={ handleChange }
		listboxProps={ {
			emptyContent: t('no options message'),
		} }
	>
		{ options.map((item) => (
			<AutocompleteItem key={ item.value }>{ item.label }</AutocompleteItem>
		)) }
	</Autocomplete>
};

export default MySelect;
