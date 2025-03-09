'use client'
import { FC, useCallback, useEffect, useState } from 'react';
import Iframe from 'react-iframe';
import { Language } from '@/models/language';

interface Props {
	locale: string
}

const TyreDiskSizeCalcComponent: FC<Props> = ({ locale }) => {
	const [ height, setHeight ] = useState('0px');

	const changeHeight = useCallback(() => {
		const iframe = document.getElementById('tireCalculator') as HTMLIFrameElement | null;

		if(iframe && iframe.contentWindow) {
			const content = iframe.contentWindow.document.querySelector('#content');

			if(content) {
				setHeight(content.clientHeight + 60 + 'px');
			}
		}
	}, []);

	useEffect(() => {
		const iframe = document.getElementById('tireCalculator') as HTMLIFrameElement | null;

		if(iframe) {
			iframe.addEventListener('load', changeHeight);
		}

		return () => {
			if(iframe) {
				iframe.removeEventListener('load', changeHeight);
			}
		};
	}, [ changeHeight ]);

	return (
		<Iframe
			url={ `/calc/kalkulator${ locale === Language.UK ? '_ua' : '' }.htm?background=2772E2` }
			width="100%"
			height={ height }
			id="tireCalculator"
			className=""
			display="block"
			loading='lazy'
			position="relative"
		/>
	)
}

export default TyreDiskSizeCalcComponent;
