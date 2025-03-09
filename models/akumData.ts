interface Item {
	value: string
	p: string
	numeric?: number
}

interface ItemS {
	value: number
	label: string
	sort_order: string
}

export interface AkumProps {
	brand_akum: ItemS[]
	dovzina: Item[]
	jemnist: Item[]
	napruga: Item[]
	obslugovuvanist: []
	poliarnist: Item[]
	['polozennia-klem']: []
	['puskovii-strum']: Item[]
	sirina: Item[]
	['tip-elektrolitu']: Item[]
	['tip-korpusu']: Item[]
	visota: Item[]
}
