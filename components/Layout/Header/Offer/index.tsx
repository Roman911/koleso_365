import Image from 'next/image';
import { useTranslations } from 'next-intl';
import LanguageChanger from '../TopLine/LanguageChanger';

const Offer = () => {
	const t = useTranslations('HeaderOffer');

	return (
		<div className='header-offer h-10 md:h-12 p-2 md:p-4 flex items-center justify-center bg-green-200 gap-1 md:gap-4'>
			<div className='w-10 md:w-16'>
				<Image
					src='/images/header/np-track.png'
					alt='np track'
					width={ 54 }
					height={ 30 }
					priority
				/>
			</div>
			<h4 className='text-xs md:text-medium uppercase font-bold text-gray-700'>{t('free battery delivery')}</h4>
			<div className='border-b-2 border-white border-dashed w-3 md:w-16'/>
			<div className='w-5'>
				<Image
					src='/images/header/marker.png'
					alt='marker'
					width={ 32 }
					height={ 32 }
					priority
				/>
			</div>
			<div className='md:hidden'>
				<LanguageChanger />
			</div>
		</div>
	)
};

export default Offer;
