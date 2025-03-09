import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { IFilter, Section, Subsection } from '@/models/filter';

export interface FilterState {
	section: Section
	subsection: Subsection
	filter: IFilter
}

const initialFilterState: IFilter = {
	width: null,
	height: null,
	radius: null,
	sezon: null,
	brand: null,
	model_id: null,
	country: null,
	year: null,
	omolog: null,
	krepeg: null,
	typedisk: null,
	colir: null,
	jemnist: null,
	puskovii_strum: null,
	tip_elektrolitu: null,
	tip_korpusu: null,
	napruga: null,
	poliarnist: null,
	vehicle_type: null,
	li: null,
	si: null,
	only_studded: null,
	only_c: null,
	only_xl: null,
	only_owl: null,
	only_run_flat: null,
	only_off_road: null,
	minPrice: null,
	maxPrice: null,
	etMin: null,
	etMax: null,
	diaMin: null,
	diaMax: null,
	minShirina: null,
	maxShirina: null,
	minVisota: null,
	maxVisota: null,
	minDovzina: null,
	maxDovzina: null,
}

const initialState: FilterState = {
	section: Section.Tires,
	subsection: Subsection.ByParams,
	filter: initialFilterState,
}

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		changeSubsection: (state, actions: PayloadAction<Subsection>) => {
			state.subsection = actions.payload;
		},
		changeSection: (state, actions: PayloadAction<Section>) => {
			state.section = actions.payload;
		},
		setParams: (state, actions: PayloadAction<IFilter>) => {
			state.filter = {...state.filter, ...actions.payload}
		},
		removeParam: (state, actions: PayloadAction<IFilter>) => {
			state.filter = {...state.filter, ...actions.payload}
		},
		resetFilter: (state) => {
			state.filter = initialFilterState;
		},
		reset: () => initialState,
	},
});

export const { changeSubsection, changeSection, setParams, removeParam, reset, resetFilter } = filterSlice.actions;

export default filterSlice.reducer;
