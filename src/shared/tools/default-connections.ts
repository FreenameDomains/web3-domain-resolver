import { DEFAULT_INFURA_RPC_URL, DEFAULT_RPC_URL } from "../constants/defaults";
import { NetworkName } from "../enumerations/enumerations";
import { NetworkConnection } from "../types/connection.types";

export class DefaultTools {
	static getDefaultConnection(networkName: NetworkName, options: { infuraIfAvailable?: boolean } = {}): NetworkConnection {
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