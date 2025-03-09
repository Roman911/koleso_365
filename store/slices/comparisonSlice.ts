import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface Item {
	id: number
	section: string
}

export interface ComparisonState {
	comparisonItems: Item[]
}

const initialState: ComparisonState = {
	comparisonItems: [],
}

export const comparisonSlice = createSlice({
	name: 'comparison',
	initialState,
	reducers: {
		addComparison: (state, actions: PayloadAction<Item>) => {
			state.comparisonItems.push(actions.payload);
		},
		addComparisonFromStorage: (state, actions: PayloadAction<Item[]>) => {
			state.comparisonItems = actions.payload;
		},
		removeComparison: (state, actions: PayloadAction<number>) => {
			state.comparisonItems = state.comparisonItems.filter(item => item.id !== actions.payload);
		},
		reset: () => initialState,
	},
})

export const { addComparison, addComparisonFromStorage, removeComparison, reset } = comparisonSlice.actions

export default comparisonSlice.reducer
