import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { Divider } from '@heroui/divider';
import * as Icons from '../../UI/Icons';
import { Language, LanguageCode } from '@/models/language';
import { SettingsProps } from '@/models/settings';
import Phones from '@/components/UI/Phones';

const InfoBlock = ({ settings }: { settings: SettingsProps }) => {
	const locale = useLocale();
	const t = useTranslations('InfoBlock');

	return <div className='lg:w-80'>
		<div className=' bg-white px-5 py-7 rounded-2xl'>
			<h4 className='font-bold mb-4'>{ t('order by number') }:</h4>
			<Phones settings={ settings } isInfo={ true } className='flex-col items-start gap-4 text-black font-bold' />
			<div className='mt-5 text-sm whitespace-pre-wrap'>
				{ settings[locale === Language.UK ? LanguageCode.UA : Language.RU].config_address }
			</div>
			<Divider className='my-4' />
			<Link href='/page/shipment'
						className='mt-4 flex items-center gap-x-2.5 font-medium text-black hover:text-primary hover:underline text-sm'>
				<Icons.DeliveryIcon className='fill-primary'/>
				<span className='underline'>{ t('delivery') }</span>
			</Link>
			<Link href='/page/payment'
						className='mt-4 flex items-center gap-x-2.5 font-medium text-black hover:text-primary hover:underline text-sm'>
				<Icons.PaymentIcon className='fill-primary'/>
				<span className='underline'>{ t('payment') }</span>
			</Link>
			<Link href='/page/garantiya-ta-povernennya'
						className='mt-4 flex items-center gap-x-2.5 font-medium text-black hover:text-primary hover:underline text-sm'>
				<Icons.GuaranteeIcon className='fill-primary'/>
				<span className='underline'>{ t('warranty and returns') }</span>
			</Link>
		</div>
	</div>
};

export default InfoBlock;
