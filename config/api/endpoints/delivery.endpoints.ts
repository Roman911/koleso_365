import { API_CONSTANTS } from '../constants';
const { NOVA_POSHTA, DELIVERY } = API_CONSTANTS.ENDPOINTS.DELIVERY;

export const deliveryEndpoints = {
	novaPoshta: {
		allCity: `${NOVA_POSHTA}/allcity`,
		search: `${NOVA_POSHTA}/search`,
		warehouses: (ref: string) => `${NOVA_POSHTA}/warehouses/${ref}`,
		documentPrice: `${NOVA_POSHTA}/getDocumentPrice`
	},
	delivery: {
		cities: (name: string) => `${DELIVERY}/cities/${name}`,
		warehouses: (ref: string) => `${DELIVERY}/warehouses/${ref}`
	}
} as const;
