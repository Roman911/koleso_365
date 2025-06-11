export const API_CONSTANTS = {
	BASE_URL: process.env.NEXT_PUBLIC_API_URL || '',
	ENDPOINTS: {
		BASE_DATA: '/baseData',
		API: '/api',
		DELIVERY: {
			NOVA_POSHTA: '/api/np',
			DELIVERY: '/api/delivery'
		}
	},
	METHODS: {
		GET: 'GET',
		POST: 'POST',
		PUT: 'PUT',
		DELETE: 'DELETE'
	}
} as const;

export const DEFAULT_HEADERS = {
	'Content-Type': 'application/json',
	'Accept': 'application/json',
	'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_ACCESS_ORIGIN || '',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
	'Access-Control-Allow-Credentials': 'true'
} as const;

export const FORM_HEADERS = {
	'Content-Type': 'application/json',
	'Accept': 'application/json'
} as const;
