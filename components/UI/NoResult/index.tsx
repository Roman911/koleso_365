import { FC } from 'react';
import { useTranslations } from 'next-intl';

interface NoResultProps {
	noResultText: string
}

const NoResult: FC<NoResultProps> = ({ noResultText }) => {
	const t = useTranslations('Home');

	return (
		<div className="py-5 px-5 text-center bg-blue-100 w-full mt-4 text-lg font-medium">
			{ t(noResultText) }
		</div>
	)
};

export default NoResult;
