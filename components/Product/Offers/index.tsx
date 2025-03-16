import { FC, Dispatch, SetStateAction } from 'react';
import { Radio, RadioGroup } from '@heroui/radio';
import CountryInfo from '@/components/UI/CountryInfo';
import { Language } from '@/models/language';
import { countryCodeTransform } from '@/lib/countryCodetransform';
import * as Icons from '@/components/UI/Icons';
import type { Offers } from '@/models/product';

interface Props {
	locale: Language
	offerId: string
	offers: Offers[]
	setOfferId: Dispatch<SetStateAction<string>>
	setQuantity: Dispatch<SetStateAction<number>>
}

const Offers: FC<Props> = ({ locale, offerId, offers, setOfferId, setQuantity }) => {
	const handleChange = (value: string) => {
		setOfferId(value);
		setQuantity(1);
	}

	return (
		<div className='offers mt-4 md:mt-10 mb-5'>
			<RadioGroup color='primary' value={ offerId } onValueChange={ handleChange } size='lg'>
				{ offers.map(item => {
					return <Radio color='primary' key={ item.offer_id } value={ `${item.offer_id}` } classNames={{
						control: 'h-3 w-3',
						wrapper: 'bg-white',
						labelWrapper: 'w-full'
					}}
												className='bg-white md:bg-transparent border md:border-0 rounded-full ml-0 mt-2 md:mt-0 w-full max-w-full'
					>
						<div
							className='grid-cols-10 grid md:grid-cols-9 w-full gap-1 md:gap-2 items-center md:min-w-[460px]'
						>
							<div className='font-medium col-span-1 md:col-span-1 text-sm md:ml-3'>
								{ item.quantity } шт.
							</div>
							<div className='country col-span-2 md:col-span-3'>
								<CountryInfo
									country={ locale === Language.UK ? item.country : item.country_ru }
									countryCode={ countryCodeTransform(item.country) } year={ item.year }
									mobileHidden={ true }
								/>
							</div>
							<div className='storage col-span-4 md:col-span-3 text-sm text-gray-600 content-center flex items-center gap-x-1 md:gap-x-2'>
								<Icons.MarkerIcon className='fill-gray-600 w-6' />
								{ locale === Language.UK ? item.posts.city : item.posts.city_ru }
							</div>
							<div className='price col-span-3 md:col-span-2 font-bold content-center text-sm'>
								{ +item.price } грн
							</div>
						</div>
					</Radio>
				}) }
			</RadioGroup>
		</div>
	)
};

export default Offers;
