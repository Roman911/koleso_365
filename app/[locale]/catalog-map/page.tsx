import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import LayoutWrapper from '@/components/Layout/LayoutWrapper';
import Breadcrumbs from '@/components/UI/Breadcrumbs';

const links = [
	{ href: 'catalog-map/tyre', title: 'tires', img: 'tires' },
	{ href: 'catalog-map/disc', title: 'disks', img: 'disks' },
	{ href: 'catalog-map/akum', title: 'battery', img: 'battery' },
	{ href: 'catalog-map/car', title: 'cars', img: 'cars' },
];

export const metadata: Metadata = {
	title: 'Каталоги',
	description: 'Каталоги',
}

export default function CatalogMap() {
	const t = useTranslations('Main');

	const path = [
		{
			title: 'brands',
			href: '/brands',
			translations: true
		}
	];

	return (
		<LayoutWrapper className='max-w-[1260px]'>
			<Breadcrumbs path={ path } />
			<div className='mt-2.5 grid grid-cols-1 lg:grid-cols-2 gap-5'>
				{ links.map((item, index) => (
					<Link key={ index } href={ `/${item.href}` } className='relative rounded-2xl group transition duration-300 overflow-hidden'>
						<Image
							src={ `/images/catalog-map/${item.img}.jpg` }
							alt={ t(item.img) }
							width={ 622 }
							height={ 348 }
							className='transition-transform duration-300 group-hover:scale-125'
						/>
						<div
							className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white uppercase text-2xl font-bold opacity-0 group-hover:opacity-100'>
							{ t(item.title) }
						</div>
					</Link>
				)) }
			</div>
		</LayoutWrapper>
	)
};
