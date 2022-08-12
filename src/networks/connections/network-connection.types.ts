export enum NetworkName {
    POLYGON = "polygon",
    POLYGON_MUMBAI = "polygon-mumbai",
    ETHEREUM = "ethereum",
    BSC = "bsc"
}

export type NetworkConnection = {
    networkName: NetworkName,
    rcpUrl: string,
    // infuraId: string | undefined
}