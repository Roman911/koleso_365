type FilterOptions = {
	[key: string]: { value: string; label: string }[];
};

export const POPULAR_SIZE: FilterOptions = {
	width: [
		{ 'value': '225', 'label': '225' },
		{ 'value': '215', 'label': '215' },
		{ 'value': '205', 'label': '205' },
		{ 'value': '235', 'label': '235' },
		{ 'value': '195', 'label': '195' },
		{ 'value': '185', 'label': '185' },
		{ 'value': '245', 'label': '245' },
		{ 'value': '255', 'label': '255' },
		{ 'value': '265', 'label': '265' },
		{ 'value': '175', 'label': '175' }
	],
	height: [
		{ 'value': '65', 'label': '65' },
		{ 'value': '55', 'label': '55' },
		{ 'value': '60', 'label': '60' },
		{ 'value': '70', 'label': '70' },
		{ 'value': '45', 'label': '45' },
		{ 'value': '50', 'label': '50' },
		{ 'value': '40', 'label': '40' },
		{ 'value': '75', 'label': '75' },
		{ 'value': '35', 'label': '35' },
		{ 'value': '80', 'label': '80' }
	],
	radius: [
		{ 'value': '17', 'label': 'R17' },
		{ 'value': '16', 'label': 'R16' },
		{ 'value': '15', 'label': 'R15' },
		{ 'value': '18', 'label': 'R18' },
		{ 'value': '19', 'label': 'R19' },
		{ 'value': '14', 'label': 'R14' },
		{ 'value': '20', 'label': 'R20' },
		{ 'value': '13', 'label': 'R13' },
		{ 'value': '22.5', 'label': 'R22.5' }
	]
};
