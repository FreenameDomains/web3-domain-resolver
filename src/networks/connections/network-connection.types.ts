import { NetworkName } from "./network-name";

export type NetworkConnection = {
    networkName: NetworkName | string,
    rpcUrl: string
}