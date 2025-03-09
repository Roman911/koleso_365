import { FC } from 'react';
import { useTranslations } from 'next-intl';

interface TitleProps {
	isMain?: boolean
	title: string
	className?: string
	translations?: boolean
}

const Title: FC<TitleProps> = ({ isMain, title, className='my-5 text-3xl md:text-4xl font-bold px-3 md:px-0', translations }) => {
	const t = useTranslations('Main');

	if(isMain) return <h1 className={ className }>{ translations ? t(title) : title }</h1>

	return <h2 className={ className }>{ translations ? t(title) : title }</h2>
};

export default Title;
