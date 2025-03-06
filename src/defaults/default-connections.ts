import { NetworkConnection, NetworkName } from "../networks/connections/network-connection.types";

export const DEFAULT_RPC_URL: Record<NetworkName, string> = {
	abstract: "https://api.mainnet.abs.xyz",
	aurora: "https://mainnet.aurora.dev",
	base: "https://base.llamarpc.com",
	bsc: "https://bsc-dataseed1.ninicoin.io",
	chiliz: "https://rpc.chiliz.com",
	cronos: "https://evm.cronos.org/",
	ethereum: "https://eth-mainnet.public.blastapi.io",
	etherlink: "https://node.mainnet.etherlink.com",
	polygon: "https://rpc-mainnet.matic.quiknode.pro",
	sei: "https://evm-rpc.sei-apis.com",
	zilliqa: "https://api.zilliqa.com"
};

// theese urls can only connect to Freename smart contract addresses
export const DEFAULT_INFURA_RPC_URL: Record<NetworkName, string> = {
	abstract: "https://api.mainnet.abs.xyz",
	aurora: "https://aurora-mainnet.infura.io/v3/de21d7dc37334e459e15e172ee9d45f2",
	base: "https://base-mainnet.infura.io/v3/de21d7dc37334e459e15e172ee9d45f2",
	bsc: "https://bsc-dataseed1.ninicoin.io",
	chiliz: "https://rpc.chiliz.com",
	cronos: "https://evm.cronos.org/",
	ethereum: "https://mainnet.infura.io/v3/de21d7dc37334e459e15e172ee9d45f2",
	etherlink: "https://node.mainnet.etherlink.com",
	polygon: "https://polygon-mainnet.infura.io/v3/de21d7dc37334e459e15e172ee9d45f2",
	sei: "https://evm-rpc.sei-apis.com",
	zilliqa: "https://api.zilliqa.com"
};

export class DefaultTools {
	static getDefaultConnection(networkName: NetworkName, options: {
		infuraIfAvailable?: boolean
	} = {}): NetworkConnection {
		const { infuraIfAvailable = false } = options;
		let url: string | undefined;

		if (infuraIfAvailable) {
			url = DEFAULT_INFURA_RPC_URL[networkName];
		}

		if (!url) {
			url = DEFAULT_RPC_URL[networkName];
		}

		return {
			networkName: networkName,
			rpcUrl: url,
		};
	}
}