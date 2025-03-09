export enum Section {
	Battery = 'battery',
	Tires = 'tires',
	Disks = 'disks',
	Car = 'car',
}

export enum Subsection {
	ByParams = 'byParams',
	ByCars = 'byCars',
}

export interface IFilter {
	width?: null | string
	height?: null | string
	radius?: null | string
	sezon?: null | string
	brand?: null | string
	model_id?: null | string
	country?: null | string
	year?: null | string
	omolog?: null | string
	krepeg?: null | string
	typedisk?: null | string
	colir?: null | string
	jemnist?: null | string
	puskovii_strum?: null | string
	tip_elektrolitu?: null | string
	tip_korpusu?: null | string
	napruga?: null | string
	poliarnist?: null | string
	vehicle_type?: null | string
	li?: null | string
	si?: null | string
	only_studded?: null | string
	only_c?: null | string
	only_xl?: null | string
	only_owl?: null | string
	only_run_flat?: null | string
	only_off_road?: null | string
	minPrice?: null | string
	maxPrice?: null | string
	etMin?: null | string
	etMax?: null | string
	diaMin?: null | string
	diaMax?: null | string
	minShirina?: null | string
	maxShirina?: null | string
	minVisota?: null | string
	maxVisota?: null | string
	minDovzina?: null | string
	maxDovzina?: null | string
}
