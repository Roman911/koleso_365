interface Auto {
	label: string
	value: number
}

interface Brand {
	label: string
	sort_order: string
	value: number
}

interface Country {
	label: string
	value: string
}

interface Item {
	numeric: number
	p?: string
	value: string
}

interface Season {
	name: string
	name_key: string
	name_ua: string
	value: number
}

interface Year {
	label: number
	value: number
}

interface ItemP {
	value: string
	p: string
}

export interface Options {
	label: number | string
	value: number | string
}

export interface BaseDataProps {
	auto: Auto[]
	brand: Brand[]
	brand_disc: Brand[]
	colir_abbr: ItemP[]
	country: Country[]
	country_ru: Country[]
	dia: Item[]
	disc_diameter: Item[]
	disc_width: Item[]
	et: Item[]
	krip: Item[]
	load: Item[]
	omolog: ItemP[]
	speed: ItemP[]
	tyre_diameter: Item[]
	tyre_height: Item[]
	tyre_season: Season[]
	tyre_width: Item[]
	tyre_year: Year[]
}

export interface CarModelProps {
	label: string
	value: number
}

interface Kits {
	id: number
	model: number
	year: number
	name: string
	pcd: number
	bolt_count:number
	dia: number
	bolt_size: string
	car2_model: {
		id: number
		brand: number
		name: string
		car2_brand: {
			id: number
			name: string
		}
	}
}

export interface KitTyreSize {
	value: number
	kits: Kits
	width: number
	height: number
	diameter: number
	type: number
	axle: number
	axle_group: null
}

export interface KitDiskSize {
	value: number
	kits: Kits
	width: number
	et: number
	diameter: number
	type: number
	axle: number
	axle_group: null
}

export interface ManufModels {
	value: number
	label: string
	types: number
	manufacturer_id: number
	alias: string
}
