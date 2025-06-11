import { API_CONSTANTS } from '../constants';
const { API } = API_CONSTANTS.ENDPOINTS;

export const formEndpoints = {
	callback: `${API}/addCallback`,
	ask: `${API}/addAsk`
} as const;
