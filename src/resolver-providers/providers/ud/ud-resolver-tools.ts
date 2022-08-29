import { BlockchainType } from "@unstoppabledomains/resolution";
import { NetworkName } from "../../../networks/connections/network-connection.types";

export class UDResolverTools {
	public static networkNameFormUdNetwork(udNetwork: BlockchainType): NetworkName {
		switch (udNetwork) {
			case BlockchainType.ETH: return NetworkName.ETHEREUM;
			case BlockchainType.MATIC: return NetworkName.POLYGON;
			case BlockchainType.ZIL: return NetworkName.ZILLIQA;
		}
	}
}