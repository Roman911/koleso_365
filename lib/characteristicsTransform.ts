type VehicleType = {
	icon: 'light' | 'suv' | 'cargo' | 'motorcycle' | 'bus' | 'special';
	name: string;
	to: string;
};

export const SeasonTransform = (season: string) => {
	const seasonMap: Record<string, { icon: string; name: string } | null> = {
		'1': { icon: '/icons/sun.svg', name: 'summer' },
		'2': { icon: '/icons/snow.svg', name: 'winter' },
		'3': { icon: '/icons/cloud.svg', name: 'all season' },
	};

	return seasonMap[season] || null;
};

export const VehicleTypeTransform = (type: string): VehicleType | undefined => {
	const vehicleTypeMap: { [key: string]: VehicleType } = {
		'1': { icon: 'light', name: 'light', to: '/catalog/tires/vt-1' },
		'2': { icon: 'suv', name: 'SUVs', to: '/catalog/tires/vt-2' },
		'3': { icon: 'cargo', name: 'cargo', to: '/catalog/tires/vt-3' },
		'4': { icon: 'cargo', name: 'cargo', to: '/catalog/tires/vt-3' },
		'5': { icon: 'cargo', name: 'cargo', to: '/catalog/tires/vt-3' },
		'6': { icon: 'cargo', name: 'cargo', to: '/catalog/tires/vt-3' },
		'7': { icon: 'motorcycle', name: 'motorcycles', to: '/catalog/tires/vt-7' },
		'8': { icon: 'bus', name: 'buses', to: '/catalog/tires/vt-8' },
		'9': { icon: 'special', name: 'special equipment', to: '/catalog/tires/vt-9' },
		'10': { icon: 'special', name: 'special equipment', to: '/catalog/tires/vt-9' },
		'11': { icon: 'special', name: 'special equipment', to: '/catalog/tires/vt-9' },
	};

	return vehicleTypeMap[type];
};
