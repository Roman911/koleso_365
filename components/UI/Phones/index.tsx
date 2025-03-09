import { FC } from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { SettingsProps } from '@/models/settings';
import type { PhoneLogo } from '@/models/config';
import kievstarLogo from '@/public/icons/kievstar-logo.svg';
import lifecellLogo from '@/public/icons/life-logo.svg';
import vodafoneLogo from '@/public/icons/vodafone-logo.svg';

const phoneLogos: Record<PhoneLogo, string> = {
	kievstar: kievstarLogo,
	lifecell: lifecellLogo,
	vodafone: vodafoneLogo,
};

interface Props {
	isInfo: boolean
	settings: SettingsProps
	className?: string
}

const Phones: FC<Props> = ({ isInfo, settings, className = '' }) => {
	const telephones: {
		phone: string
		url: string
		logo: PhoneLogo
	}[] = [
		{ phone: settings.ua.config_telephone_vodafone, url: settings.ua.config_telephone_vodafone_url, logo: 'vodafone' },
		{ phone: settings.ua.config_telephone_kievstar, url: settings.ua.config_telephone_kievstar_url, logo: 'kievstar' },
		{ phone: settings.ua.config_telephone_life, url: settings.ua.config_telephone_life_url, logo: 'lifecell' },
	];

	return (
		<div className={
			twMerge('py-1 flex items-center', isInfo && 'text-black flex-col items-start gap-2', className)
		}>
			{ telephones.map((item, index) => {
				return <div
					key={ index }
					className={ twMerge('flex items-center my-0.5 text-sm font-bold', !isInfo && 'mr-1.5 md:mr-5') }
				>
					{ item.logo && <Image
						src={ phoneLogos[item.logo] }
						alt={ item.logo }
						width={ 20 }
						height={ 20 }
						priority
					/> }
					<a href={ `tel:${ item.url }` } className='ml-1 md:ml-2.5'>
						{ item.phone }
					</a>
				</div>
			}) }
		</div>
	)
};

export default Phones;
