import { BlockchainType } from "@unstoppabledomains/resolution";
import { UdNetwork } from "../../../shared/enumerations/enumerations";

export class UDResolverTools {
	public static networkNameFormUdNetwork(udNetwork: BlockchainType): UdNetwork {
		switch (udNetwork) {
			case BlockchainType.ETH: return UdNetwork.ETHEREUM;
			case BlockchainType.POL: return UdNetwork.POLYGON;
			case BlockchainType.BASE: return UdNetwork.BASE;
			case BlockchainType.ZIL: return UdNetwork.ZILLIQA;
			default: throw new Error(`Unsupported BlockchainType: ${udNetwork}`);
		}
	}
}