export enum NetworkName {
    POLYGON = "polygon",
    POLYGON_MUMBAI = "polygon-mumbai",
    ETHEREUM = "ethereum",
    BSC = "bsc",
    ZILLIQA = "zil",
    HARDHAT = "hardhat"
}

export type NetworkConnection = {
    networkName: NetworkName | string,
    rpcUrl: string
}