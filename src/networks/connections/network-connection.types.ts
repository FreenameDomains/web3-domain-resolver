export enum NetworkName {
    POLYGON = "polygon",
    ETHEREUM_MAINNET = "ethereum",
    POLYGON_MUMBAI = "polygon-mumbai",
}

export type NetworkConnection = {
    network: NetworkName,
    rcpUrl: string,
    infuraId: string | undefined
}