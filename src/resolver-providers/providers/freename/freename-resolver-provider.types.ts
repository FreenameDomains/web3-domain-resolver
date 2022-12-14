enum FreenameItemType {
    TLD = "TLD",
    SECOND_LEVEL_DOMAIN = "SECOND_LEVEL_DOMAIN",
    SUB_DOMAINED_DOMAIN = "SUB_DOMAINED_DOMAIN",
}

export enum FreenameNetwork {
    POLYGON = "polygon",
    POLYGON_MUMBAI = "polygon-mumbai",
    ETHEREUM = "ethereum",
    BSC = "bsc"
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