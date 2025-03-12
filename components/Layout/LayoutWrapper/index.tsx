import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

const LayoutWrapper = ({ children, className }: { children: ReactNode, className?: string }) => {
	return (
		<div className={ twMerge('container mx-auto px-4 py-5 min-h-[70vh]', className) }>
			{ children }
		</div>
	)
};

export default LayoutWrapper;
