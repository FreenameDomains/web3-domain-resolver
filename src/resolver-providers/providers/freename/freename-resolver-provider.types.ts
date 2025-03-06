enum FreenameItemType {
	TLD = "TLD",
	SECOND_LEVEL_DOMAIN = "SECOND_LEVEL_DOMAIN",
	SUB_DOMAINED_DOMAIN = "SUB_DOMAINED_DOMAIN",
}

export enum FreenameNetwork {
	ABSTRACT = "abstract",
	AURORA = "aurora",
	BASE = "base",
	BSC = "bsc",
	CHILIZ = "chiliz",
	CRONOS = "cronos",
	ETHEREUM = "ethereum",
	ETHERLINK = "etherlink",
	POLYGON = "polygon",
	SEI = "sei"
}

export type FreenameMetadata = {
	name: string,
	description: string,
	image: string,
	itemType: FreenameItemType
	external_url: string,
	image_url: string,
	network: FreenameNetwork,
	properties: {
		[key: string]: any
	}
}