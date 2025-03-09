import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

const LayoutWrapper = ({ children, className }: { children: ReactNode, className?: string }) => {
	return (
		<div className={ twMerge('container mx-auto max-w-[1420px] px-4 py-5 min-h-[70vh]', className) }>
			{ children }
		</div>
	)
};

export default LayoutWrapper;
