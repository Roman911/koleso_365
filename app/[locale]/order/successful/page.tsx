import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function SuccessfulOrder() {
	const t = useTranslations('SuccessfulOrder');

	return (
		<div className='mt-8 mb-16 text-center py-5 px-4'>
			<h3 className='font-bold mb-4 text-3xl'>
				{ t('thanks for your order') }!
			</h3>
			<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" className="mx-auto fill-green-300" height="150" width="150" xmlns="http://www.w3.org/2000/svg">
				<path fillRule="evenodd"
							d="M17.354 4.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L10 11.293l6.646-6.647a.5.5 0 01.708 0z"
							clipRule="evenodd"></path>
				<path fillRule="evenodd"
							d="M10 4.5a5.5 5.5 0 105.5 5.5.5.5 0 011 0 6.5 6.5 0 11-3.25-5.63.5.5 0 11-.5.865A5.472 5.472 0 0010 4.5z"
							clipRule="evenodd"></path>
			</svg>
			<p className='mb-8 mt-4 font-bold text-xl'>
				{ t('manager will contact you shortly') }
			</p>
			<Link href={`/`} className='pl-2 pr-2 text-primary hover:underline '>
				{ t('return to home page') }
			</Link>
		</div>
	)
};
