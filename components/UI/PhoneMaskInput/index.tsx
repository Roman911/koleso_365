'use client'
import { useState } from 'react';
import { PatternFormat } from 'react-number-format';
import { Input } from '@heroui/input';

const PhoneMaskInput = () => {
	const [ phone, setPhone ] = useState('');

	const handleChangeAmount = (values: { value: string }) => {
		setPhone(values.value);
	};

	return (
		<PatternFormat
			format="+38 (###)###-##-##" allowEmptyFormatting mask="_"
			value={ phone }
			onValueChange={ handleChangeAmount }
			customInput={ Input }
			aria-label="input-monto"
			name='phone'
		/>
	)
};

export default PhoneMaskInput;
