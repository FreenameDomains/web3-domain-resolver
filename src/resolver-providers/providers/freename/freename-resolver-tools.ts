import { NetworkName } from "../../../networks/connections/network-connection.types";
import { FreenameNetwork } from "./freename-resolver-provider.types";

export class FreenameResolverTools {

    public static networkNameFormFreenameNetwork(freenameNetwork: FreenameNetwork): NetworkName {
        switch (freenameNetwork) {
            case FreenameNetwork.BSC: return NetworkName.BSC;
            case FreenameNetwork.ETHEREUM: return NetworkName.ETHEREUM;
            case FreenameNetwork.POLYGON: return NetworkName.POLYGON;
            case FreenameNetwork.POLYGON_MUMBAI: return NetworkName.POLYGON_MUMBAI;
        }
    }

}