'use client';
import { FC, useMemo, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Button, ButtonGroup } from '@heroui/button';
import { Card, CardBody, CardFooter } from '@heroui/card';
import { Link, useRouter } from '@/i18n/routing';
import { useAppDispatch } from '@/hooks/redux';
import { addCart } from '@/store/slices/cartSlice';
import { setProgress } from '@/store/slices/progressSlice';
import type { Product } from '@/models/products';
import { Language } from '@/models/language';
import { addToStorage, getFromStorage } from '@/lib/localeStorage';
import { Section } from '@/models/filter';
import Rating from '@/components/UI/Rating';
import IconsBlock from '@/components/ProductList/Card/IconsBlock';
import ActionsBlock from '@/components/ProductList/Card/ActionsBlock';
import QuickOrder from '@/components/Product/QuickOrder';
import { Divider } from '@heroui/divider';

const cargo = [ '3', '4', '5', '6', '9', '10', '11' ];

interface Props {
	item: Product
}

const ProductCard: FC<Props> = ({ item }) => {
	const [ isLoading, setLoading ] = useState(false);
	const locale = useLocale();
	const router = useRouter();
	const dispatch = useAppDispatch();
	const t = useTranslations('Main');
	const { default_photo, full_name, sku, min_price, season, vehicle_type, page_url, best_offer, group } = item;
	const cartStorage = useMemo(() => getFromStorage('reducerCart'), []);
	const section = item.vehicle_type ? Section.Tires : Section.Disks;
	const sectionNew = section === Section.Tires ? cargo.includes(item.vehicle_type) ? 'cargo' : 'tires' : section;

	const handleClick = () => {
		setLoading(true);
		if(!cartStorage?.find((item: { id: number, quantity: number }) => item.id === best_offer.id)) {
			const cart = [ ...cartStorage, {
				id: best_offer.id,
				section: sectionNew,
				quantity: 1
			} ];
			dispatch(addCart({ id: best_offer.id, quantity: 1, section }));
			addToStorage('reducerCart', cart);
		}
		router.push(`/cart`)
	};

	const onClick = () => {
		dispatch(setProgress(true));
	}

	return (
		<Card radius='none' className='relative py-2 px-4'>
			<CardBody>
				<div className='relative md:min-h-72 sm:min-h-52 text-center'>
					<IconsBlock season={ season } vehicle_type={ vehicle_type }/>
					<ActionsBlock sectionNew={ sectionNew } group={ group }/>
					<Image
						className='mx-auto'
						src={ default_photo || `/images/no-photo${ locale === Language.UK ? '' : '-ru' }.jpg` }
						alt={ full_name }
						width={ 220 }
						height={ 220 }
					/>
				</div>
				<Link
					onClick={ onClick }
					href={ `/${ page_url }` }
					className='font-bold my-2.5 min-h-12 after:absolute after:inset-0'
				>
					{ full_name }
				</Link>
				<div className='text-sm text-gray-500 my-2.5'>
					<span>Артикул: </span><span>{ sku }</span>
				</div>
				<Rating commentsCount={ undefined } commentsAvgRate={ 0 }/>
				<div className='flex items-end mt-2 mb-0.5'>
					<div className='text-2xl font-bold'>{ min_price } ₴</div>
				</div>
			</CardBody>
			<CardFooter className='px-0'>
				<ButtonGroup radius='full' className='w-full'>
					<Button isLoading={ isLoading } onPress={ handleClick } size='lg' color='primary' className='text-sm font-bold uppercase'>
						{ t('buy') }
					</Button>
					<Divider orientation='vertical' />
					<QuickOrder
						offerId={ best_offer.id }
						quantity={ 1 }
						section={ section }
						className='text-sm font-bold uppercase bg-[#334CCC] text-white'
						offerItem={{ product_id: best_offer.id, price: best_offer.price }}
					/>
				</ButtonGroup>
			</CardFooter>
		</Card>
	)
};

export default ProductCard;
