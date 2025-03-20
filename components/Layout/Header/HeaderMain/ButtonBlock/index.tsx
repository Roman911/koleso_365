'use client'
import { useEffect } from 'react';
import { Link, usePathname } from '@/i18n/routing';
import { Badge } from '@heroui/badge';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setProgress } from '@/store/slices/progressSlice';
import { addBookmarksFromStorage } from '@/store/slices/bookmarksSlice';
import { addComparisonFromStorage } from '@/store/slices/comparisonSlice';
import { addCartFromStorage } from '@/store/slices/cartSlice';
import * as Icons from '@/components/UI/Icons';
import { getFromStorage } from '@/lib/localeStorage';

const ButtonBlock = () => {
	const pathname = usePathname();
	const dispatch = useAppDispatch();
	const { bookmarksItems } = useAppSelector(state => state.bookmarksReducer);
	const { cartItems } = useAppSelector(state => state.cartReducer);

	useEffect(() => {
		const bookmarksStorage = getFromStorage('reducerBookmarks') || [];
		const comparisonStorage = getFromStorage('reducerComparison') || [];
		const cartStorage = getFromStorage('reducerCart') || [];

		if(bookmarksStorage.length !== 0) {
			dispatch(addBookmarksFromStorage(bookmarksStorage));
		}
		if(comparisonStorage.length !== 0) {
			dispatch(addComparisonFromStorage(comparisonStorage));
		}
		if(cartStorage.length !== 0) {
			dispatch(addCartFromStorage(cartStorage));
		}
	}, [ dispatch ]);

	const handleClick = (href: string) => {
		if(pathname !== href) dispatch(setProgress(true));
	}

	return (
		<>
			<Link href='/bookmarks' onClick={ () => handleClick('/bookmarks') } className='relative flex'>
				<Badge
					color='primary'
					content={ bookmarksItems.length }
					isInvisible={ bookmarksItems.length === 0 }
					className='border-white text-white'
				>
					<Icons.HeartIcon className='stroke-black'/>
				</Badge>
			</Link>
			<Link href='/order' onClick={ () => handleClick('/order') } className='relative flex'>
				<Badge
					color='primary'
					content={ cartItems.length }
					isInvisible={ cartItems.length === 0 }
					className='border-white'
				>
					<Icons.CartIcon className='stroke-black'/>
				</Badge>
			</Link>
		</>
	)
};

export default ButtonBlock;
