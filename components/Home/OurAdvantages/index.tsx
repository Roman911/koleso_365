import Image from 'next/image';
import { useTranslations } from 'next-intl';

const items = [
	{
		id: 1,
		img: 'delivery-truck',
		title: 'delivery without prepayment',
		description: 'pay only after receiving'
	},
	{
		id: 2,
		img: 'warehouse',
		title: 'warehouse in kyiv region',
		description: 'we have a warehouse in the city of vasylkiv'
	},
	{
		id: 3,
		img: 'watch',
		title: 'we work on weekends',
		description: 'we accept orders even on weekends'
	}
];

const OurAdvantages = () => {
	const t = useTranslations('OurAdvantages');

	return (
		<div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
			{ items.map(({ id, img, title, description }) => (
				<div key={ id } className='bg-white border-1 border-[#EAECEE] rounded-md px-5 py-6'>
					<Image src={ `/icons/our-advantages/${ img }.svg` } width={ 50 } height={ 50 } alt='' />
					<h6 className='text-xl font-bold mt-2 mb-4'>{ t(title) }</h6>
					<p>{ t(description) }</p>
				</div>
			)) }
		</div>
	)
};

export default OurAdvantages;
