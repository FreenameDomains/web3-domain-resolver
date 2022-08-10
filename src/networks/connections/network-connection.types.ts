import { NetworkName } from "../nework-name";

export type NetworkConnection = {
    network: NetworkName,
    rcpUrl: string,
    infuraId: string
}