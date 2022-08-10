export enum NetworkName {
    POLYGON = "polygon",
    ETHEREUM_MAINNET = "ethereum"
}

export type NetworkConnection = {
    network: NetworkName,
    rcpUrl: string,
    infuraId: string | undefined
}