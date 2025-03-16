'use client'
import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { useAppDispatch } from '@/hooks/redux';
import { useAppSubmit } from '@/hooks/submit';
import { setParams } from '@/store/slices/filterSlice';

interface SelectFromTo {
	name: string
	nameMin: string
	nameMax: string
	from: number
	to: number
	title: string
	btnTitle: string
	minus?: boolean
}

export const SelectFromTo: FC<SelectFromTo> = ({ nameMin, nameMax, from, to, title, btnTitle, minus }) => {
	const [ minMax, setMinMax ] = useState({ min: '', max: '' });
	const dispatch = useAppDispatch();
	const { handleSubmit } = useAppSubmit();
	const t = useTranslations('Filters');

	const onChange = (param: string, value: string) => {
		const onlyNumbers = value.replace(minus ? /[^\d-]/g : /\D/g, '');
		setMinMax({ ...minMax, [param]: onlyNumbers });
	}

	const handleClick = () => {
		const updateParams = (key: string, value: string) => {
			if(value.length > 0) {
				dispatch(setParams({ [key]: value })); // Use computed property name for dynamic key
			} else {
				dispatch(setParams({ [key]: null }));
			}
		};

		updateParams(nameMin, minMax.min);
		updateParams(nameMax, minMax.max);
		handleSubmit();
	};

	return <div className='mt-5'>
		<div className='text-sm font-bold text-gray-500 uppercase'>{ title }</div>
		<div className='flex gap-2 mt-3'>
			<Input
				className='max-w-32'
				placeholder={ `${ t('from') } ${ from }` }
				maxLength={ 6 }
				value={ minMax.min }
				variant='bordered'
				radius='full'
				onChange={ event => onChange('min', event.target.value) }
			/>
			<Input
				className='max-w-32'
				placeholder={ `До ${ to }` }
				maxLength={ 6 }
				value={ minMax.max }
				variant='bordered'
				radius='full'
				onChange={ event => onChange('max', event.target.value) }
			/>
		</div>
		<Button onPress={ handleClick } className='btn bg-black text-white max-w-full w-full uppercase mt-4 mb-4'>
			{ btnTitle }
		</Button>
	</div>
};
