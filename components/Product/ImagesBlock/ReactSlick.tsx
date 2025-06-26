import { FC, MouseEvent, TouchEvent, useRef, useState } from 'react';
import Image from 'next/image';
import Slider, { CustomArrowProps } from 'react-slick';
import { Photo } from '@/models/product';
import { Modal, ModalBody, ModalContent, useDisclosure, } from "@heroui/modal";
import './index.scss';

const swipeThreshold = 10;

interface ImageItem {
	original: string
	thumbnail: string
}

interface Props {
	images: Photo[]
	photo: {
		url_part: string
		url_part2: string
	}
}

export const ReactSlick: FC<Props> = ({ images, photo }) => {
	const [ index, setIndex ] = useState(0);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const startX = useRef<number | null>(null);
	const startY = useRef<number | null>(null);
	const modalSliderRef = useRef<Slider | null>(null);

	const openModalIfDesktop = () => {
		if (typeof window !== 'undefined' && window.innerWidth >= 768) {
			onOpen();
		}
	}

	const onePhoto: ImageItem = {
		original: photo.url_part,
		thumbnail: photo.url_part2,
	};

	const imgArr: ImageItem[] = images.map((item) => ({
		original: item.big,
		thumbnail: item.small,
	}));

	const items = [ onePhoto, ...imgArr ];

	const handleMouseDown = (e: MouseEvent) => {
		startX.current = e.clientX;
		startY.current = e.clientY;
	}

	const handleMouseUp = (e: MouseEvent) => {
		if(startX.current !== null && startY.current !== null) {
			const dx = Math.abs(e.clientX - startX.current);
			const dy = Math.abs(e.clientY - startY.current);
			if(dx < swipeThreshold && dy < swipeThreshold) {
				openModalIfDesktop();
			}
		}
		startX.current = null;
		startY.current = null;
	}

	const handleTouchStart = (e: TouchEvent) => {
		const touch = e.touches[0];
		startX.current = touch.clientX;
		startY.current = touch.clientY;
	}

	const handleTouchEnd = (e: TouchEvent) => {
		const touch = e.changedTouches[0];
		if(startX.current !== null && startY.current !== null) {
			const dx = Math.abs(touch.clientX - startX.current);
			const dy = Math.abs(touch.clientY - startY.current);
			if(dx < swipeThreshold && dy < swipeThreshold) {
				openModalIfDesktop();
			}
		}
		startX.current = null;
		startY.current = null;
	}

	const SampleNextArrow = (props: CustomArrowProps) => {
		const { className, style, onClick } = props;
		return (
			<div
				className={ className }
				style={ { ...style } }
				onClick={ onClick }
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" fill="currentColor"/></svg>
			</div>
		);
	}

	const SamplePrevArrow = (props: CustomArrowProps) => {
		const { className, style, onClick } = props;
		return (
			<div
				className={ className }
				style={ { ...style } }
				onClick={ onClick }
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" fill="currentColor"/></svg>
			</div>
		);
	}

	const settings = {
		customPaging: function(i: number) {
			return (
				<a>
					<div className='slick-dot'></div>
					<Image className='slick-dot-img' src={ items[i].thumbnail || '' } alt='' width={ 60 } height={ 60 } loading='lazy'/>
				</a>
			);
		},
		arrows: false,
		dots: true,
		dotsClass: 'slick-dots slick-thumb',
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		beforeChange: (_oldIndex: number, newIndex: number) => setIndex(newIndex), // 🟢 відслідковує поточний слайд
	};

	const settingsModal = {
		...settings,
		arrows: true,
		nextArrow: <SampleNextArrow/>,
		prevArrow: <SamplePrevArrow/>,
		initialSlide: index
	};

	return (
		<div className='slider-container md:max-w-72 mx-auto'>
			{ items.length > 1 ? (
				<Slider { ...settings }>
					{ items.map((item, i) => (
						<div
							key={ i }
							onMouseDown={ handleMouseDown }
							onMouseUp={ handleMouseUp }
							onTouchStart={ handleTouchStart }
							onTouchEnd={ handleTouchEnd }
							className='cursor-pointer'
						>
							<Image src={ item.thumbnail || '' } alt='' width={ 560 } height={ 560 } loading='lazy'/>
						</div>
					)) }
				</Slider>
			) : (
				<Image src={ items[0].thumbnail || '' } alt='' width={ 560 } height={ 560 } onClick={ onOpen }/>
			) }

			<Modal isOpen={ isOpen } size='3xl' onClose={ onClose } placement='top-center'>
				<ModalContent>
					{ () => (
						<>
							<ModalBody>
								<div className='max-w-xl mx-auto'>
									{ items.length > 1 ? <Slider { ...settingsModal } ref={ modalSliderRef }>
										{ items.map((item, i) => (
											<Image key={ i } src={ item.original || '' } alt='' width={ 560 } height={ 560 } loading='lazy'/>
										)) }
									</Slider> : <Image src={ items[0].original || '' } alt='' width={ 560 } height={ 560 } loading='lazy'/> }
								</div>
							</ModalBody>
						</>
					) }
				</ModalContent>
			</Modal>
		</div>
	);
};
