export enum NetworkName {
    POLYGON = "polygon",
    POLYGON_MUMBAI = "polygon-mumbai",
    ETHEREUM = "ethereum",
    BSC = "bsc",
    ZILLIQA = "zil",
    HARDHAT = "hardhat",
    AURORA = "aurora",
    CRONOS = "cronos"
}

export type NetworkConnection = {
    networkName: NetworkName | string,
    rpcUrl: string
}