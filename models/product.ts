interface Posts {
	post_id: number
	name: string
	status: number
	created_at: string
	updated_at: string
	city: string
	city_ru: string
}

export interface Offers {
	offer_id: number
	product_id: number
	quantity: number
	price: string
	opt: string
	my_opt: string
	status: number
	viewed: number
	created_at: string
	updated_at: string
	post_id: number
	block: number
	updated: string
	country: string
	country_ru: string
	year: number
	posts: Posts
}

export interface OfferGroup {
	id: number
	sku: number
	model: number
	width: string
	height: string
	diameter: string
	reinforce: boolean
	run_flat: boolean
	load_index: string
	load_index_ru: string
	speed_index: string
	speed_index_ru: string
	homologation: boolean
	studded: boolean
	vehicle_type: string
	krep_pcd1: string
	id_typedisc: string
	off_road: boolean
	active: boolean
	ply_rating: boolean
	ZR: boolean
	demo: boolean
	seal: boolean
	silent: boolean
	et: string
	dia: string
}

interface Model {
	id: number
	name: string
	brand: number
	brand_image: string
	brand_name: string
	alias: string
	season: string
	images: []
}

interface ModelDescription {
	name: string
	meta_title: null
	meta_h1: null
	meta_description: null
}

export interface Labels {
	product_id: number
	label_id: number
	label: {
		label_id: number
		name: string
		class: string
		color: string
		name_ru: string
		status: number
	}
}

export interface Review {
	review_id: number
	score: number
	status: number
	model_id: number
	product_id: number
	trc_id: null
	text: string
	minus: null
	plus: null
	name: string
	email: string
	created_at: string
	updated_at: string
}

export interface Photo {
	big: string
	small: string
}

interface Descr {
	description: string
	meta_description: string
	meta_h1: string
	meta_title: string
}

export interface Product {
	disabled: boolean
	size_format: number
	descr: {
		ua: Descr
		ru: Descr
	}
	photo: {
		url_part: string
		url_part2: string
	}
	photos: {
		urls: Photo[] | false
	}
	min_price: number
	max_price: number
	trc_id: number
	brand: {
		id: number
		name: string
		alias: string
	}
	offers: Offers[]
	full_name: string
	id: number
	offer_group: OfferGroup
	model: Model
	model_description: {
		ua: ModelDescription
		ru: ModelDescription
	}
	page_url: string
	labels: Labels[]
	review: Review[]
}

export interface ProductProps {
	data: Product
	result: boolean
}
