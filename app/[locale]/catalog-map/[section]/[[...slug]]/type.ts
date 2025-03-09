export interface Brand {
	id: number
	name: string
	manufacturer_id: number
	sort_order: string
	types: number
	image: string
	updated_at: string
	created_at: string
	alias: string
	status: number
	brand_id: number
}

export interface BrandsObject {
	data: {
		[key: string]: Brand[]
	}
	section: string | undefined
	title: string
}

export interface Item {
	alias: string
	manufacturer_id: number
	model_id: number
	model_id_trc: number
	name: string
	status: number
	types: number
}

export interface BrandsObjectItems {
	data: Item[]
	section: string | undefined
	title: string
}
