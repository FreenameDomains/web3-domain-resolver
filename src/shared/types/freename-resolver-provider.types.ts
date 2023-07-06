import { FreenameItemType, FreenameNetwork } from "../enumerations/enumerations";

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

export type FreenameContractConfig = {
    networkName: FreenameNetwork,
    address: string, type: "read" | "write",
    test: boolean,
    abi?: Record<string, any>
}