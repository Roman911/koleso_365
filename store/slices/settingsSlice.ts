import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { SettingsProps } from '@/models/settings';

export interface RootParamsProps {
	settings: SettingsProps
}

const items = {
	config_name: '',
	config_email: '',
	description: '',
	config_owner: '',
	config_telephone_besk_url: '',
	config_telephone_besk: '',
	config_telephone_vodafone_url: '',
	config_telephone_vodafone: '',
	config_telephone_kievstar_url: '',
	config_telephone_kievstar: '',
	config_telephone_life_url: '',
	config_telephone_life: '',
	config_address: null,
	config_open: '',
	config_telephones: null,
	h2_popular_auto: '',
	h2_popular_tyre: '',
	h2_top: '',
	meta_title: '',
	meta_description: '',
	config_punct: '',
	kredit: '',
}

const initialState: RootParamsProps = {
	settings: {
		0: {
			body_html: '',
			head_html: '',
		},
		ru: items,
		ua: items,
	}
}

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setSettings: (state, actions: PayloadAction<SettingsProps>) => {
			state.settings = {...state.settings, ...actions.payload}
		},
	},
});

export const { setSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
