interface SettingsItems {
	config_name: string
	config_email: string
	description: string
	config_owner: string
	config_telephone_besk_url: string
	config_telephone_besk: string
	config_telephone_vodafone_url: string
	config_telephone_vodafone: string
	config_telephone_kievstar_url: string
	config_telephone_kievstar: string
	config_telephone_life_url: string
	config_telephone_life: string
	config_address: string | null
	config_open: string
	config_telephones: string | null
	h2_popular_auto: string
	h2_popular_tyre: string
	h2_top: string
	meta_title: string
	meta_description: string
	config_punct: string
	kredit: string
}

export interface SettingsProps {
	0: {
		body_html: string
		head_html: string
	}
	ru: SettingsItems
	ua: SettingsItems
}
