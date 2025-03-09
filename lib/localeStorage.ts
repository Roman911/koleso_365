import { Section } from '@/models/filter';

type StorageName = string

interface Value {
	id: number
	section: Section
	quantity?: number
}

export const getFromStorage = (storageName: StorageName) => {
	if (typeof window !== 'undefined' && localStorage[storageName]) {
		return JSON.parse(localStorage[storageName]);
	}
	return [];
};

export const addToStorage = (storageName: StorageName, value: Value[]) => {
	localStorage.setItem(storageName, JSON.stringify(value));
};

export const removeFromStorage = (storageName: StorageName, id: number) => {
	const storage = localStorage[storageName] ? JSON.parse(localStorage[storageName]) : [];
	localStorage.setItem(storageName, JSON.stringify(storage.filter((item: { id: number }) => item.id !== id)));
};

export const resetStorage = (storageName: StorageName) => {
	localStorage.setItem(storageName, JSON.stringify([]));
};
