import Image from 'next/image';

const Offer = () => {
	return (
		<div className='header-offer h-10 md:h-14 p-2 md:p-4 bg-green-200 gap-2 md:gap-4'>
			<div className='max-w-[600px] mx-auto flex items-center justify-center h-full'>
				<div className='w-12 md:w-16 mr-auto'>
					<Image
						src='/images/header/np-track.png'
						alt='np track'
						width={ 67 }
						height={ 40 }
						priority
					/>
				</div>
				<div className='border-b-2 border-white border-dashed w-4 md:w-16'/>
				<Image
					src='/images/header/marker.png'
					alt='marker'
					width={ 36 }
					height={ 36 }
					priority
				/>
			</div>
		</div>
	)
};

export default Offer;
