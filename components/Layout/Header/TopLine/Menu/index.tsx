'use client'
import { FC } from 'react';
import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { useAppDispatch } from '@/hooks/redux';
import { setProgress } from '@/store/slices/progressSlice';
import { AliasAll } from '@/models/alias';
import { Language } from '@/models/language';

interface Props {
	alias: AliasAll
}

const Menu: FC<Props> = ({ alias }) => {
	const pathname = usePathname();
	const dispatch = useAppDispatch();
	const locale = useLocale();

	const handleClick = (href: string) => {
		if(pathname !== href) dispatch(setProgress(true));
	}

	return (
		<nav className='gap-2 2xl:gap-6 items-center hidden lg:flex ml-auto mr-8'>
			{ alias.header.map((item, index) => {
				return <Link
					key={ index }
					href={ `/page/${item.slug}` }
					onClick={ () => handleClick(`/page/${item.slug}`) }
					className='text-xs 2xl:text-sm font-medium uppercase hover:underline'>
					{ item.descriptions[locale === Language.UK ? 'ua' : 'ru'].title }
				</Link>
			}) }
		</nav>
	)
};

export default Menu;
