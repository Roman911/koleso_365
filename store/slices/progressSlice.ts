import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ProgressState {
	progress: boolean
}

const initialState: ProgressState = {
	progress: false,
}

export const progressSlice = createSlice({
	name: 'progress',
	initialState,
	reducers: {
		setProgress: (state, actions: PayloadAction<boolean>) => {
			state.progress = actions.payload
		},
		reset: () => initialState,
	},
})

export const { setProgress, reset } = progressSlice.actions;

export default progressSlice.reducer;
