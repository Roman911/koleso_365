"use client";
import Image from 'next/image';
import * as React from "react";
import dynamic from "next/dynamic";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { Photo } from '@/models/product';
import './index.scss';

const LightboxMy = dynamic(() => import("./LightboxComponent"), { ssr: false });
const LightboxImage = dynamic(() => import("./LightboxImage"), { ssr: false });

const inline = {
	style: {
		width: "100%",
		maxWidth: "290px",
		aspectRatio: "1",
		margin: "0 auto",
	},
};

interface Props {
	images: Photo[]
	photo: {
		url_part: string
		url_part2: string
	}
}

export default function Home({ photo, images }: Props) {
	const [index, setIndex] = React.useState(-1);
	const slides = [{ src: photo.url_part2, width: 600, height: 600 }];

	if (images.length === 0) {
		return <>
			<Image
				src={ photo.url_part2 }
				alt=''
				width={ 288 }
				height={ 288 }
				onClick={ () => setIndex(0) }
			/>
			<LightboxImage
				index={index}
				slides={slides}
				open={index >= 0}
				close={() => setIndex(-1)}
			/>
		</>
	}

	return (
		<LightboxMy
			slides={ slides }
			inline={ inline }
			carousel={ {
				padding: 0,
				spacing: 0,
				imageFit: "cover",
			}}
		/>
	);
}
