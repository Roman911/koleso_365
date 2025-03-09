import { SVGProps } from 'react';

const MailIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width="24px"
		height="24px"
		fill="none"
		strokeWidth='1.2'
		strokeLinecap='round'
		strokeLinejoin='round'
		viewBox="0 0 24 24"
		{ ...props }
	>
		<path
			d="M20.4 4.5H3.6C2.4402 4.5 1.5 5.42341 1.5 6.5625V18.9375C1.5 20.0766 2.4402 21 3.6 21H20.4C21.5598 21 22.5 20.0766 22.5 18.9375V6.5625C22.5 5.42341 21.5598 4.5 20.4 4.5Z"
		/>
		<path
			d="M22.5 7.59375L13.0815 13.4719C12.7573 13.6713 12.3825 13.7771 12 13.7771C11.6175 13.7771 11.2427 13.6713 10.9185 13.4719L1.5 7.59375"
		/>
	</svg>
);

export default MailIcon;
