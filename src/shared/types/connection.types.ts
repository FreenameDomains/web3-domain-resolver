import { NetworkName } from "../enumerations/enumerations";

export type NetworkConnection = {
  networkName: NetworkName,
  rpcUrl: string
}