import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface CreateItem {
	id: number
	quantity: number
	section: string
}

export interface CartState {
	cartItems: CreateItem[]
}

const initialState: CartState = {
	cartItems: [],
}

export const cartSlice = createSlice({
	name: 'cartSlice',
	initialState,
	reducers: {
		addCart: (state, actions: PayloadAction<CreateItem>) => {
			state.cartItems.push(actions.payload);
		},
		addCartFromStorage: (state, actions: PayloadAction<CreateItem[]>) => {
			state.cartItems = actions.payload;
		},
		removeCart: (state, actions: PayloadAction<number>) => {
			state.cartItems = state.cartItems.filter(item => item.id !== actions.payload);
		},
		setQuantity: (state, actions: PayloadAction<CreateItem>) => {
			state.cartItems = [
				...state.cartItems.filter(item => item.id !== actions.payload.id),
				{ id: actions.payload.id, quantity: actions.payload.quantity, section: actions.payload.section }
			];
		},
		reset: () => initialState,
	},
});

export const { addCart, addCartFromStorage, removeCart, setQuantity, reset } = cartSlice.actions

export default cartSlice.reducer
