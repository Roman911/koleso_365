'use client';
import { twMerge } from 'tailwind-merge';
import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { Language } from '@/models/language';

const params = [
	{ title: 'UA', language: Language.UK },
	{ title: 'RU', language: Language.RU },
];

const LanguageChanger = () => {
	const pathname = usePathname();
	const locale = useLocale();

	return (
		<div className='divide-x text-gray-500 divide-gray-500 font-semibold text-sm 2xl:text-base'>
			{ params.map((item, index) => {
				return <Link
					locale={ item.language }
					key={ index }
					href={ pathname }
					className={
						twMerge(
							'leading-8 pr-1.5 2xl:pr-3 active:text-black hover:text-black',
							locale === item.language && 'text-black pointer-events-none',
							index === 0 && 'pr-1.5 2xl:pr-3',
							index === 1 && 'pl-1.5 2xl:px-3'
						)
					}>
					{ item.title }
				</Link>
			}) }
		</div>
	)
};

export default LanguageChanger;
