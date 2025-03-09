interface DescriptionsItem {
	title: string
}

interface Descriptions {
	ua: DescriptionsItem
	ru: DescriptionsItem
}

export interface AliasItem {
	article_id: number
	status: number
	slug: string
	created_at: string
	updated_at: string
	sort_header: number
	sort_footer: number
	header: number
	footer: number
	descriptions: Descriptions
}

export interface AliasAll {
	footer: AliasItem[]
	header: AliasItem[]
}

interface DescriptionContent {
	title: string
	content: string
	meta_h1: string
	meta_title: string
	meta_description: string
}

interface Description {
	ua: DescriptionContent
	ru: DescriptionContent
}

interface Page {
	description: Description
	alias: string
}

export type Pages = {
	[key: string]: Page
}
