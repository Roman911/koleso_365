'use client'
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Language } from '@/models/language';

export default function NotFound() {
	const locale = useLocale();

	return (
		<div className='min-h-96 bg-white py-10 px-6'>
			<div className='max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4'>
				<div className='mt-16 col-span-2 ml-auto'>
					<h2
						className='text-5xl mb-10 text-center lg:text-start'>404 {locale === Language.UK ? 'Сторінку не знайдено' : 'Страница не найдена'}</h2>
					<p className='text-lg'>
						{
							locale === Language.UK ?
								'Можливо ця сторінка була вилучена або допущена помилка в адресі Скористайтесь пошуком або поверніться ' :
								'Возможно эта страница была удалена или допущена ошибка в адресе Воспользуйтесь поиском или вернитесь '
						}
						<Link
							className='text-blue-500 uppercase font-semibold hover:underline'
							href={`/`}>{locale === Language.UK ? 'На головну сторінку' : 'На главную страницу'}
						</Link>
					</p>
				</div>
				<Image width={ 626 } height={ 428 } src='/images/error-pages/car-wheel.png' alt='' />
			</div>
		</div>
	)
}
