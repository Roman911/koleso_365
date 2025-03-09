'use client'
import { FC } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Pagination } from '@heroui/pagination';
import { Language } from '@/models/language';

interface Props {
	initialPage: number
	total: number
}

const MyPagination: FC<Props> = ({ initialPage, total }) => {
	const { locale, section, slug } = useParams<{ locale: Language, section: string, slug: string[] }>();
	const params = slug ? slug.filter(item => !item.startsWith('p-')).join('/') : '';
	const router = useRouter();

	const onchange = (page: number) => {
		router.push(`/${locale}/catalog/${section}/p-${page}/${params}`)
	}

	return (
		<Pagination
			size='lg'
			initialPage={ initialPage }
			total={ total }
			variant='bordered'
			onChange={ onchange }
			classNames={{ cursor: 'text-black' }}
		/>
	)
};

export default MyPagination;
