'use client'
import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import { Navbar, NavbarBrand, NavbarContent, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@heroui/navbar';
import { Link } from '@/i18n/routing';
import MyNavbar from './Navbar';
import styles from './index.module.scss';
import Logo from '@/components/UI/Logo';
import Search from './Search';
import ButtonBlock from './ButtonBlock';
import * as Icons from '@/components/UI/Icons';
import CarTireFilter from './CarTireFilter';
import CarDiskFilter from '@/components/Layout/Header/HeaderMain/CarDiskFilter';
import { links } from '@/components/Layout/Header/links';
import { SettingsProps } from '@/models/settings';
import Contacts from '@/components/Layout/Header/HeaderMain/Contacts';

interface Props {
	settings: SettingsProps
}

const HeaderMain: FC<Props> = ({ settings }) => {
	const [ isMenuOpen, setIsMenuOpen ] = useState(false);
	const [ filterIsOpen, setFilterOpen ] = useState<boolean | string>(false);
	const t = useTranslations('Main');

	const handleClick = (value: boolean | string) => {
		if(filterIsOpen !== value) {
			setFilterOpen(value);
		} else {
			setFilterOpen(false);
		}
	};

	const closeFilter = () => {
		setFilterOpen(false);
		setIsMenuOpen(false);
	}

	return (
		<Navbar
			maxWidth='2xl'
			isMenuOpen={ isMenuOpen }
			onMenuOpenChange={ setIsMenuOpen }
			className={ twMerge('bg-white relative') }
			classNames={ { wrapper: twMerge('grid h-30 md:h-18 items-center justify-normal py-1 px-4 grid-cols-2 gap-2 md:gap-4 lg:grid-cols-[260px_auto_auto_150px]', styles['container']) } }
		>
			<NavbarContent className={ styles.logo }>
				<NavbarBrand>
					<Logo />
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent className='hidden sm:block'>
				<MyNavbar />
			</NavbarContent>
			<NavbarContent className={ styles.search }>
				<Search />
			</NavbarContent>
			<NavbarContent justify='end' className='px-2 md:px-4 gap-3 md:gap-4'>
				<Contacts settings={ settings } />
				<ButtonBlock />
				<NavbarMenuToggle className="sm:hidden" aria-label={ isMenuOpen ? "Close menu" : "Open menu" }/>
			</NavbarContent>
			<NavbarMenu className={ twMerge('mt-6 bg-white pt-16 px-2', styles.menu) }>
				<NavbarMenuItem>
					<button
						onClick={ () => handleClick('tires') }
						className={ twMerge('px-5 py-2 w-full flex items-center justify-between uppercase font-bold group transition hover:text-primary',
							filterIsOpen === 'tires' && 'text-primary') }
					>
						<span>{ t('cartires') }</span>
						<span className={ twMerge('transition', filterIsOpen === 'tires' && 'rotate-180') }>
						<Icons.ChevronDownIcon
							className={ twMerge('stroke-black transition group-hover:stroke-primary w-4 h-4', filterIsOpen === 'tires' && 'stroke-primary') }/>
					</span>
					</button>
					{ filterIsOpen === 'tires' &&
						<div className='mt-4 px-4 grid grid-cols-2 gap-2'>
							<CarTireFilter closeFilter={ closeFilter } />
						</div>
					}
				</NavbarMenuItem>
				<NavbarMenuItem>
					<button
						onClick={ () => handleClick('disks') }
						className={ twMerge('px-5 py-2 w-full flex items-center justify-between uppercase font-bold group transition hover:text-primary',
							filterIsOpen === 'disks' && 'text-primary'
						) }>
						<span>{ t('cardiscs') }</span>
						<span className={ twMerge('transition', filterIsOpen === 'disks' && 'rotate-180') }>
						<Icons.ChevronDownIcon
							className={ twMerge('stroke-black transition group-hover:stroke-primary w-4 h-4', filterIsOpen === 'disks' && 'stroke-primary') }/>
					</span>
					</button>
					{ filterIsOpen === 'disks' &&
						<div className='mt-4 px-4 grid grid-cols-2 gap-2'>
							<CarDiskFilter closeFilter={ closeFilter } />
						</div>
					}
				</NavbarMenuItem>
				{ links.map((item, index) => {
					return <NavbarMenuItem key={ index }>
						<Link
							href={ item.url }
							onClick={ () => closeFilter() }
							className='py-2 px-5 block uppercase font-bold'
						>
							{ t(item.title) }
						</Link>
					</NavbarMenuItem>
				}) }
			</NavbarMenu>
		</Navbar>
	)
};

export default HeaderMain;
