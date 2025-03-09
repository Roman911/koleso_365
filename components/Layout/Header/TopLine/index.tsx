import { FC } from 'react';
import { SettingsProps } from '@/models/settings';
import Phones from '@/components/UI/Phones';
import Menu from './Menu';
import { AliasAll } from '@/models/alias';
import LanguageChanger from '@/components/Layout/Header/TopLine/LanguageChanger';

interface Props {
	alias: AliasAll
	settings: SettingsProps
}

const TopLine: FC<Props> = ({ alias, settings }) => {
	return (
		<section className='top-line w-full bg-gray-200 border-b border-gray-400'>
			<div className='container mx-auto flex justify-between py-2 px-4'>
				<Phones settings={ settings } isInfo={ false } />
				<Menu alias={ alias } />
				<LanguageChanger />
			</div>
		</section>
	)
};

export default TopLine;
