import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface Item {
	id: number
	section: string
}

export interface BookmarksState {
	bookmarksItems: Item[]
}

const initialState: BookmarksState = {
	bookmarksItems: [],
}

export const bookmarksSlice = createSlice({
	name: 'bookmarks',
	initialState,
	reducers: {
		addBookmarks: (state, actions: PayloadAction<Item>) => {
			state.bookmarksItems.push(actions.payload);
		},
		addBookmarksFromStorage: (state, actions: PayloadAction<Item[]>) => {
			state.bookmarksItems = actions.payload;
		},
		removeBookmarks: (state, actions: PayloadAction<number>) => {
			state.bookmarksItems = state.bookmarksItems.filter(item => item.id !== actions.payload);
		},
		reset: () => initialState,
	},
});

export const { addBookmarks, removeBookmarks, addBookmarksFromStorage, reset } = bookmarksSlice.actions

export default bookmarksSlice.reducer
