import { SVGProps } from 'react';

const ChevronDownIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width="24px"
		height="24px"
		fill="none"
		stroke="currentColor"
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={ 2 }
		viewBox="0 0 24 24"
		{ ...props }
	>
		<path xmlns="http://www.w3.org/2000/svg" d="M2.3999 6.59998L11.9999 16.2L21.5999 6.59998" />
	</svg>
);

export default ChevronDownIcon;
