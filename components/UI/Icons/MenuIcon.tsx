import { SVGProps } from 'react';

const MenuIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		width="24px"
		height="24px"
		fill="none"
		viewBox="0 0 24 24"
		{ ...props }
	>
		<path
			d="M0 4.31995V5.27995H24V4.31995H0ZM0 11.5199V12.4799H24V11.5199H0ZM0 18.7199V19.6799H24V18.7199H0Z"
		/>
	</svg>
);

export default MenuIcon;
