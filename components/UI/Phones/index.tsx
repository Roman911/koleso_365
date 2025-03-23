import { FC } from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { SettingsProps } from '@/models/settings';
import * as Icons from  '../Icons';
import type { PhoneLogo } from '@/models/config';

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
		{ phone: settings.ua.config_telephone_life, url: settings.ua.config_telephone_life_url, logo: 'life' },
	];

	const filterTelephones = telephones.filter(i => i.phone);

	return (
		<div className={
			twMerge('py-1 flex items-center', isInfo && 'text-black flex-col items-start gap-2', className)
		}>
			{ filterTelephones.map((item, index) => {
				return <div
					key={ index }
					className={ twMerge('flex items-center my-0.5 text-sm', !isInfo && 'mr-1.5 lg:mr-5') }
				>
					{ item.logo && <Image
						src={ `/icons/${item.logo}-logo.svg` }
						alt={ item.logo }
						width={ 20 }
						height={ 20 }
						priority
					/> }
					<a href={ `tel:${ item.url }` } className='ml-1 lg:ml-2.5'>
						{ item.phone }
					</a>
					{ item.logo === 'life' && <Icons.ViberIcon className='ml-2 h-5 w-5 fill-[#775bbc]' /> }
				</div>
			}) }
		</div>
	)
};

export default Phones;
