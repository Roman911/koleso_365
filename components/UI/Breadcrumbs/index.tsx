'use client';
import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { twMerge } from 'tailwind-merge';
import { BreadcrumbItem, Breadcrumbs } from '@heroui/breadcrumbs';
import { Link } from '@/i18n/routing';
import * as Icons from '@/components/UI/Icons';

interface Props {
	path: {
		href: string
		title: string
		translations?: boolean
	}[]
}

const MyBreadcrumbs: FC<Props> = ({ path }) => {
	const t = useTranslations('Main');

	return (
		<Breadcrumbs separator='/' className='text-gray-500 hover:text-primary'>
			<BreadcrumbItem>
				<Link href='/'>
					<Icons.HomeIcon className='w-4 h-4 fill-gray-500'/>
				</Link>
			</BreadcrumbItem>
			{ path.filter(item => item.href !== '').map((item, index) => {
				return (
					<BreadcrumbItem key={ index + 1 } className={ twMerge(index === path.length - 1 ? 'font-semibold' : 'underline') }>
						<Link href={ item.href } className={ twMerge(index === path.length - 1 && 'text-gray-600') }>
							{ item.translations ? t(item.title) : item.title }
						</Link>
					</BreadcrumbItem>
				)
			}) }
		</Breadcrumbs>
	)
};

export default MyBreadcrumbs;
