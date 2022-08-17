import { NetworkConnection, NetworkName } from "../networks/connections/network-connection.types";

export const DEFAULT_RPC_URL: Record<NetworkName, string> = {
	"polygon-mumbai": "https://polygontestapi.terminet.io/rpc",
	bsc: "https://bsc-dataseed.binance.org",
	ethereum: "https://eth-mainnet.public.blastapi.io",
	polygon: "https://rpc-mainnet.matic.quiknode.pro",
	zil: "",
};

export class DefaultTools {
	static getDefaultConnection(networkName: NetworkName): NetworkConnection {
		const url = DEFAULT_RPC_URL[networkName];
		return {
			networkName: networkName,
			rpcUrl: url,
		};
	}
}