import { NetworkName } from "../../../networks/connections/network-connection.types";
import { FreenameNetwork } from "./freename-resolver-provider.types";

export class FreenameResolverTools {

	public static networkNameFormFreenameNetwork(freenameNetwork: FreenameNetwork): NetworkName {
		switch (freenameNetwork) {
			case FreenameNetwork.AURORA:
				return NetworkName.AURORA;
			case FreenameNetwork.BASE:
				return NetworkName.BASE;
			case FreenameNetwork.BSC:
				return NetworkName.BSC;
			case FreenameNetwork.CHILIZ:
				return NetworkName.CHILIZ;
			case FreenameNetwork.CRONOS:
				return NetworkName.CRONOS;
			case FreenameNetwork.ETHEREUM:
				return NetworkName.ETHEREUM;
			case FreenameNetwork.ETHERLINK:
				return NetworkName.ETHERLINK;
			case FreenameNetwork.POLYGON:
				return NetworkName.POLYGON;
			case FreenameNetwork.SEI:
				return NetworkName.SEI;
		}
	}
}