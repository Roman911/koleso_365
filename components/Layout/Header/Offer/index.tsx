import Image from 'next/image';
import { useTranslations } from 'next-intl';

const Offer = () => {
	const t = useTranslations('HeaderOffer');

	return (
		<div className='header-offer h-10 md:h-14 p-2 md:p-4 flex items-center justify-center bg-green-200 gap-2 md:gap-4'>
			<div className='w-12 md:w-16'>
				<Image
					src='/images/header/np-track.png'
					alt='np track'
					width={ 67 }
					height={ 40 }
					priority
				/>
			</div>
			<h4 className='text-xs md:text-lg uppercase font-bold'>{t('free battery delivery')}</h4>
			<div className='border-b-2 border-white border-dashed w-4 md:w-16'/>
			<Image
				src='/images/header/marker.png'
				alt='marker'
				width={ 36 }
				height={ 36 }
				priority
			/>
		</div>
	)
};

export default Offer;
