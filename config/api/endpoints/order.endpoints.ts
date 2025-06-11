import { API_CONSTANTS } from '../constants';
const { API } = API_CONSTANTS.ENDPOINTS;

export const orderEndpoints = {
	params: `${API}/getOrdersParam`,
	create: `${API}/addOrder`
} as const;
