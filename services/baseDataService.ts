import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// import type { BaseDataProps, CarModelProps, KitTyreSize, KitDiskSize, ManufModels } from '@/models/baseData';
import type { BaseDataProps, CarModelProps, KitDiskSize, KitTyreSize, ManufModels } from '@/models/baseData';
import type { SettingsProps } from '@/models/settings';
import type { ProductsProps } from '@/models/products';
// import type { ProductProps } from '../models/product';
import type { AkumProps } from '@/models/akumData';
import type { OrdersParamProps } from '@/models/ordersParam';
// import type { Banner } from '../models/banners';
// import { FeatureParamsProps } from '../models/featureParams';
import type { AliasAll } from '@/models/alias';

export const baseDataAPI = createApi({
	reducerPath: 'dataAPI',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.SERVER_URL,
		headers: {
			'Access-Control-Allow-Credentials': 'true',
			'Access-Control-Allow-Origin': process.env.ACCESS_ORIGIN || '',
		},
	}),
	tagTypes: ['baseDataAPI', 'Product'],
	endpoints: (build) => ({
		fetchSettings: build.query<SettingsProps, string>({
			query: () => ({
				url: `/baseData/settings`,
			}),
		}),
		fetchBaseData: build.query<BaseDataProps, string>({
			query: () => ({
				url: '/baseData',
			}),
		}),
		fildterData: build.query<BaseDataProps, string>({
			query: (id) => ({
				url: `/api/FildterData${id}`,
			}),
		}),
		fetchAutoModel: build.query<CarModelProps[], string>({
			query: (id) => ({
				url: `/baseData/getAutoBrandModel/${id}`,
			}),
		}),
		fetchAutoYear: build.query<number[], string>({
			query: (id) => ({
				url: `/baseData/getAutoBrandModelYear/${id}`,
			}),
		}),
		fetchAutoModelKit: build.query<CarModelProps[], string>({
			query: (id) => ({
				url: `/baseData/getAutoBrandModelKit/${id}`,
			}),
		}),
		fetchKitTyreSize: build.query<KitTyreSize[], string>({
			query: (id) => ({
				url: `/baseData/getKitTyreSize/${id}`,
			}),
		}),
		fetchKitDiskSize: build.query<KitDiskSize[], string>({
			query: ([section]) => ({
				url: `/baseData/getKitDiskSize/${[section]}`,
			}),
		}),
		fetchManufModels: build.query<ManufModels[], string>({
			query: ([section]) => ({
				url: `/api/getManufModels/${[section]}`,
			}),
		}),
		fetchStatiAliasAll: build.query<AliasAll, string>({
			query: () => ({
				url: `/baseData/StatiAlias`,
			}),
		}),
		fetchStatiAlias: build.query({
			query: (id) => ({
				url: `/baseData/StatiAlias/${id}`,
			}),
		}),
		fetchProducts: build.query<ProductsProps | undefined, {id: string, start?: number, length?: number}>({
			query: ({ id, start = 0, length = 10 }) => ({
				url: `/api/getProducts${id}`,
				method: 'POST',
				body: {
					start,
					length
				}
			}),
		}),
		fetchDataAkum: build.query<AkumProps, string>({
			query: () => ({
				url: `/api/baseDataAkum`,
			}),
		}),
		// fetchProduct: build.query<ProductProps, string>({
		// 	query: ([section]) => ({
		// 		url: `/api/getProduct/${[section]}`,
		// 	}),
		// 	providesTags: () => ['Product']
		// }),
		// fetchBrand: build.query({
		// 	query: ([section]) => ({
		// 		url: `/api/brand/${[section]}`,
		// 	}),
		// }),
		// fetchModel: build.query({
		// 	query: ([section]) => ({
		// 		url: `/api/model/${[section]}`,
		// 	}),
		// }),
		// fetchBrands: build.query({
		// 	query: (section) => ({
		// 		url: `/api/catalog-map/${section}`,
		// 	}),
		// }),
		// fetchBrandItems: build.query({
		// 	query: ({ section, [section] }) => ({
		// 		url: `/api/catalog-map/${section}/${[section]}`,
		// 	}),
		// }),
		createComment: build.mutation({
			query: (comment) => ({
				url: '/api/addReview',
				method: 'POST',
				body: comment,
			}),
			invalidatesTags: ['Product'],
		}),
		fetchOrdersParam: build.query<OrdersParamProps, string>({
			query: () => ({
				url: `/api/getOrdersParam`,
			}),
		}),
		fetchNpSearch: build.query({
			query: (name) => ({
				url: `/api/np/search`,
				method: 'POST',
				body: {
					name: name
				}
			}),
		}),
		fetchNpWarehouses: build.query({
			query: (ref) => ({
				url: `/api/np/warehouses/${ref}`,
			}),
		}),
		// fetchBanners: build.query<Banner[], string>({
		// 	query: () => ({
		// 		url: `https://admin.luxshina.ua/api/banner`,
		// 	}),
		// }),
		// fetchFeatureParams: build.query<FeatureParamsProps, string>({
		// 	query: () => ({
		// 		url: `/api/getFeatureParams`,
		// 	}),
		// }),
		fetchNpDocumentPrice: build.query({
			query: (params) => ({
				url: `/api/np/getDocumentPrice`,
				method: 'POST',
				body: params,
			}),
		}),
		createOrder: build.mutation({
			query: (data) => ({
				url: '/api/addOrder',
				method: 'POST',
				body: data,
				header: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json',
				}
			}),
		}),
		createCallback: build.mutation({
			query: (data) => ({
				url: '/api/addCallback',
				method: 'POST',
				body: data,
				header: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json',
				}
			}),
		}),
		createAddAsk: build.mutation({
			query: (data) => ({
				url: '/api/addAsk',
				method: 'POST',
				body: data,
				header: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json',
				}
			}),
		}),
	}),
});
