'use client';

import { FC, useMemo, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Review } from '@/models/product';
import Title from '@/components/UI/Title';
import ReviewItem from '@/components/Home/Reviews/ReviewItem';
import { CustomArrowProps } from 'react-slick';
import './index.scss';

interface Props {
	reviews: Review[];
}

const Arrow: FC<CustomArrowProps & { direction: 'left' | 'right' }> = ({ className, style, onClick, direction }) => (
	<div className={className} style={{ ...style }} onClick={onClick}>
		{direction === 'right' ? (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
				<path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" fill="currentColor" />
			</svg>
		) : (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
				<path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" fill="currentColor" />
			</svg>
		)}
	</div>
);

const Reviews: FC<Props> = ({ reviews }) => {
	const [isDesktop, setIsDesktop] = useState(false);

	useEffect(() => {
		const handleResize = () => setIsDesktop(window.innerWidth >= 768);
		handleResize(); // run once on mount
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const settings = useMemo(() => ({
		arrows: isDesktop,
		nextArrow: <Arrow direction="right" />,
		prevArrow: <Arrow direction="left" />,
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: isDesktop ? 4 : 1,
		slidesToScroll: isDesktop ? 4 : 1,
	}), [isDesktop]);

	return (
		<div className="mt-28">
			<Title title="customer reviews" translations />
			{reviews.length > 3 ? (
				<div className='mx-auto md:px-8'>
					<Slider {...settings}>
						{reviews.map((review) => (
							<ReviewItem key={review.review_id} review={review} />
						))}
					</Slider>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-12 gap-5">
					{reviews.map((review) => (
						<ReviewItem key={review.review_id} review={review} />
					))}
				</div>
			)}
		</div>
	);
};

export default Reviews;
