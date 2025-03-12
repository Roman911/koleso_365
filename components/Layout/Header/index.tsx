import { FC } from 'react';
import { SettingsProps } from '@/models/settings';
import Offer from '@/components/Layout/Header/Offer';
import TopLine from '@/components/Layout/Header/TopLine';
import { AliasAll } from '@/models/alias';
import HeaderMain from '@/components/Layout/Header/HeaderMain';

interface Props {
	alias: AliasAll
	settings: SettingsProps
}

const Header: FC<Props> = ({ alias, settings }) => {
	return (
		<div className='header'>
			<Offer />
			<TopLine settings={ settings } alias={ alias } />
			<HeaderMain settings={ settings } />
		</div>
	)
};

export default Header;
