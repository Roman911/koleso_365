'use client'
import { ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@/store/store';

export default function StoreProvider({ children }: { children: ReactNode }) {
	// Use useRef to hold the store instance and initialize it lazily
	const storeRef = useRef<AppStore | null>(null);

	if (!storeRef.current) {
		storeRef.current = makeStore(); // Initialize the store only once
	}

	// Return the Provider component with the store
	return <Provider store={ storeRef.current }>{ children }</Provider>;
}