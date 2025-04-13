export interface Car2BrandProps {
	id: number
	name: string
	featured: number
}

export interface ProductTiporazmerProps {
	tiporazmer_id: number
	width: string
	height: string
	radius: string
	featured: number
}

export interface FeatureParamsProps {
	Car2Brand: Car2BrandProps[]
	ProductTiporazmer: ProductTiporazmerProps[]
}
