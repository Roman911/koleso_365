interface Model {
	name: string
	model_images: []
}

interface BestOffer {
	id: number
	price: string
	post_id: number
	city: string
	city_ru: string
	year: number
	country: string
	country_ru: string
	quantity: number
}

export interface Product {
	full_name: string
	default_photo: string
	group: number
	sku: number
	product_id: number
	trc_id: number
	min_price: number
	max_price: number
	season: string
	vehicle_type: string
	popularity: number
	model_id: number
	brand: number
	offers: BestOffer[]
	brand_name: string
	diameter: string | false
	width: string | false
	height: string | false
	load_index: string | false
	load_index_ru: string | false
	speed_index: string | false
	speed_index_ru: string | false
	homologation: string | false
	typedisc: string | false
	krep_pcd1: string | false
	et: string | false
	dia: string | false
	jemnist: string | false
	puskovii_strum: string | false
	napruga: string | false
	run_flat: boolean
	page_url: string
	model: Model
	best_offer: BestOffer
	labels: []
}

export interface Data {
	total_count: number
	products: Product[]
}

export interface ProductsProps {
	result: boolean
	data: Data
}
