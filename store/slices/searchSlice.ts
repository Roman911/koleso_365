import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SearchState {
	search: string
}

const initialState: SearchState = {
	search: '',
}

export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setSearch: (state, actions: PayloadAction<string>) => {
			state.search = actions.payload
		},
		reset: () => initialState,
	},
})

export const { setSearch, reset } = searchSlice.actions

export default searchSlice.reducer
