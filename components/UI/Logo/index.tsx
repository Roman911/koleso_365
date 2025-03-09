import { FC } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import logo from '@/public/logo.svg';

const Logo: FC = () => {
	return (
		<Link href='/' className='logo'>
			<Image
				src={ logo }
				alt="logo"
				width={ 243 }
				height={ 50 }
				priority
			/>
		</Link>
	)
};

export default Logo;
