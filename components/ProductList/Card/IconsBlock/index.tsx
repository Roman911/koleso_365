import { FC } from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import * as Icons from '@/components/UI/Icons';

const icons = {
	1: Icons.CarIcon,
	2: Icons.SuvIcon,
	7: Icons.MotorcyclesIcon,
	8: Icons.BusIcon,
	9: Icons.CargoIcon,
};

interface Props {
	season: string
	vehicle_type: string
}

const IconsBlock: FC<Props> = ({ season, vehicle_type }) => {
	const seasonIcon = season === '1' ? 'sun' : season === '2' ? 'snow' : season === '3' ? 'all-season' : undefined;
	const vehicle_type_number = vehicle_type as unknown as keyof typeof icons;
	const Icon = icons[vehicle_type_number] || null;

	return (
		<div className='absolute left-0 top-0'>
			{ seasonIcon && <Image
				src={ `/icons/${ seasonIcon }.svg` }
				alt=''
				width={ 24 }
				height={ 24 }
				priority
			/> }
			{ Icon && <Icon className={ twMerge('fill-gray-500', vehicle_type === '2' && 'stroke-gray-500') }/> }
		</div>
	)
};

export default IconsBlock;
