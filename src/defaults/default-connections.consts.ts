import { NetworkConnection, NetworkName } from "../networks/connections/network-connection.types";

export const DEFAULT_ENS_JSON_RCP_CONNECTION: NetworkConnection = {
    infuraId: undefined,
    network: NetworkName.ETHEREUM_MAINNET,
    rcpUrl: ""
}

export const DEFAULT_UD_JSON_RCP_CONNECTION: NetworkConnection = {
    infuraId: undefined,
    network: NetworkName.POLYGON,
    rcpUrl: ""
}

export const DEFAULT_FNS_POLYGON_MUMBAI_JSON_RCP_CONNECTION: NetworkConnection = {
    infuraId: undefined,
    network: NetworkName.POLYGON_MUMBAI,
    rcpUrl: ""
}