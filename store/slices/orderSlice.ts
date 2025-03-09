import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Items {
	value: string
	label: string
}

export interface OrderState {
	city: Items
	wirehouse: Items
}

const initialState: OrderState = {
	city: {
		value: '',
		label: '',
	},
	wirehouse: {
		value: '',
		label: '',
	},
}

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		setCity: (state, actions: PayloadAction<{ value: string, label: string }>) => {
			state.city = actions.payload
		},
		setWirehouse: (state, actions: PayloadAction<{ value: string, label: string }>) => {
			state.wirehouse = actions.payload
		},
		reset: () => initialState,
	},
})

export const { setCity, setWirehouse, reset } = orderSlice.actions

export default orderSlice.reducer
