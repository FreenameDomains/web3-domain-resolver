import { ethers } from "ethers"

export enum NetworkName {
    POLYGON = "polygon",
    POLYGON_MUMBAI = "polygon-mumbai",
    ETHEREUM = "ethereum",
    BSC = "bsc",
    ZILLIQA = "zil"
}

export type NetworkConnection = {
    networkName: NetworkName,
    rpcUrl: string
}