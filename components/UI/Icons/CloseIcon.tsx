import { SVGProps } from 'react';

const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width="24px"
		height="24px"
		fill="none"
		stroke="currentColor"
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={ 1 }
		viewBox="0 0 24 24"
		{ ...props }
	>
		<path
			d="M3.70489 3.01501L3.01489 3.70501L11.3099 12L3.01489 20.295L3.70489 20.985L11.9999 12.69L20.2949 20.985L20.9849 20.295L12.6899 12L20.9849 3.70501L20.2949 3.01501L11.9999 11.31L3.70489 3.01501Z"
		/>
	</svg>
);

export default CloseIcon;
