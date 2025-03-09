import { FC, JSX } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { linksCatalog } from './linksCatalog';
import * as Icons from '@/components/UI/Icons';
import { AliasAll, AliasItem } from '@/models/alias';
import { Language, LanguageCode } from '@/models/language';
import { SettingsProps } from '@/models/settings';
import Phones from '@/components/UI/Phones';

type IconType = 'telegram' | 'facebook' | 'viber';

const social = {
	links: [
		{ link: 'https://t.me', logo: 'telegram' },
		{ link: 'https://www.facebook.com', logo: 'facebook' },
		{ link: 'https://www.viber.com', logo: 'viber' },
	],
}

interface Props {
	alias: AliasAll
	settings: SettingsProps
}

const Footer: FC<Props> = ({ alias, settings }) => {
	const t = useTranslations('Footer');
	const locale = useLocale();
	const lang = locale === Language.UK ? LanguageCode.UA : Language.RU;

	const icons: Record<IconType, JSX.Element> = {
		telegram: <Icons.TelegramIcon className='fill-black group-hover:fill-white'/>,
		facebook: <Icons.FacebookIcon className='fill-black group-hover:fill-white'/>,
		viber: <Icons.ViberIcon className='fill-black group-hover:fill-white'/>,
	};

	const link = (link: string, title: string, index: number) => {
		return <Link
			key={ index }
			className='text-white block text-sm font-medium mt-4 transition hover:text-primary hover:underline'
			href={ link }
		>
			{ title }
		</Link>
	}

	return <footer className='bg-black'>
		<div className='container mx-auto py-16 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
			<div>
				<div className='flex gap-x-5'>
					{ social.links.map((item, index) => {
						return <a
							key={ index }
							target='_blank'
							href={ item.link }
							className='w-9 h-9 rounded-full cursor-pointer bg-white flex items-center justify-center transition group hover:bg-primary'
						>
							{ icons[item.logo as IconType] }
						</a>
					}) }
				</div>
				<p className='text-gray-500 mt-7 mb-7 leading-6 text-sm'>
					© { settings && settings[lang].config_name } { new Date().getFullYear() }.<br/>
					{ t('all rights reserved') }.
				</p>
			</div>
			<div>
				<h6 className='text-gray-500 text-sm font-bold'>
					{ t('contacts') }
				</h6>
				<Phones settings={ settings } isInfo={ false } className='flex-col items-start gap-4 text-white font-normal' />
				<div className='flex items-center mt-5'>
					<Icons.EmailIcon className='fill-white'/>
					{ settings && <a href={ `mailto:${ settings[lang].config_email }` } className='ml-2.5 text-sm text-white'>
						{ settings[lang].config_email }
					</a> }
				</div>
				{ settings && settings[lang].config_address && <>
					<h6 className='mt-8 text-gray-500 text-sm font-bold'>
						{ t('delivery points') }
					</h6>
					<p className='text-white block text-sm font-medium mt-2 whitespace-pre-wrap leading-8'>
						{ settings[lang].config_address }
					</p>
				</> }
			</div>
			<div>
				<h6 className='text-gray-500 text-sm font-bold mb-7'>
					Каталог
				</h6>
				{ linksCatalog.map((item, index) => {
					return link(item.link, t(item.title), index)
				}) }
			</div>
			<div>
				<h6 className='text-gray-500 text-sm font-bold mb-7'>
					{ t('information') }
				</h6>
				{ alias.footer.map((item: AliasItem, index: number) => {
					return link(`/page/${ item.slug }`, item.descriptions[lang].title, index)
				}) }
			</div>
		</div>
	</footer>
};

export default Footer;
