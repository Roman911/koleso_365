import { FC } from 'react';
import DOMPurify from 'isomorphic-dompurify';
import Image from 'next/image';

interface Props {
	description: string;
}

const TextSeo: FC<Props> = ({ description })=> {
	const HtmlContent = ({ htmlString }: { htmlString: string }) => {
		const sanitizedHtml = DOMPurify.sanitize(htmlString);
		return (
			<div
				className='flex-1'
				dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
			/>
		);
	};

	return (
		<div className='mt-20 mb-24 flex flex-col lg:flex-row'>
			<HtmlContent htmlString={ description } />
			<Image src='/images/seo/banner.jpg' alt='' width={ 496 } height={ 401 } className='rounded-2xl' />
		</div>
	)
}

export default TextSeo;
