import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface BrandAliasState {
	brand: string
	model: string
}

const initialState: BrandAliasState = {
	brand: '',
	model: ''
}

export const brandAliasSlice = createSlice({
	name: 'brandAlias',
	initialState,
	reducers: {
		addBrandAlias: (state, actions: PayloadAction<string>) => {
			state.brand = actions.payload;
		},
		addModelAlias: (state, actions: PayloadAction<string>) => {
			state.model = actions.payload;
		},
		reset: () => initialState,
	},
});

export const { addBrandAlias, addModelAlias, reset } = brandAliasSlice.actions

export default brandAliasSlice.reducer
