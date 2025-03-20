import { FC } from 'react';
import Image from 'next/image';
import { Link, usePathname } from '@/i18n/routing';
import { useAppDispatch } from '@/hooks/redux';
import { setProgress } from '@/store/slices/progressSlice';
import logo from '@/public/logo.svg';

const Logo: FC = () => {
	const pathname = usePathname();
	const dispatch = useAppDispatch();

	const handleClick = () => {
		if(pathname !== '/') dispatch(setProgress(true));
	}

	return (
		<Link href='/' onClick={ handleClick } className='logo'>
			<Image
				src={ logo }
				alt="logo"
				width={ 260 }
				height={ 54 }
				priority
			/>
		</Link>
	)
};

export default Logo;
