import { API_CONSTANTS } from '../constants';
const { BASE_DATA, API } = API_CONSTANTS.ENDPOINTS;

export const baseEndpoints = {
	baseData: BASE_DATA,
	settings: `${BASE_DATA}/settings`,
	featureParams: `${API}/getFeatureParams`,
	reviews: `${API}/reviews`,
	filterData: (id: string) => `${API}/FildterData${id}`,
	autoBrandModel: (id: string) => `${BASE_DATA}/getAutoBrandModel/${id}`,
	autoBrandModelYear: (id: string) => `${BASE_DATA}/getAutoBrandModelYear/${id}`,
	autoBrandModelKit: (id: string) => `${BASE_DATA}/getAutoBrandModelKit/${id}`,
	kitTyreSize: (id: string) => `${BASE_DATA}/getKitTyreSize/${id}`,
	kitDiskSize: (section: string) => `${BASE_DATA}/getKitDiskSize/${section}`,
	manufModels: (section: string) => `${API}/getManufModels/${section}`,
	brands: (id: string) => `${API}/catalog-map/${id}`,
	statiAlias: {
		all: `${BASE_DATA}/StatiAlias`,
		byId: (id: string) => `${BASE_DATA}/StatiAlias/${id}`
	}
} as const;
