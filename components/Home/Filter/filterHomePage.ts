import type { Options } from '@/models/baseData';
import { Section } from '@/models/section';

interface Filters {
	focusValue?: string
	label: string
	name: string
	options: Options[] | undefined
	hidden?: string
}

export interface OnChange {
	(name: string, value: number | string | null, section: Section): void
}

export interface FilterProps {
	filters: Filters[]
	onChange: OnChange
	section: Section
	color?: 'primary' | 'secondary'
}
