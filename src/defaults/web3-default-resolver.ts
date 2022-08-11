import { ENSResolverProvider } from "../resolver-providers/providers/ens/ens-resolver-provider";
import { FreenameResolverProvider } from "../resolver-providers/providers/freename/freename-resolver-provider";
import { UDResolverProvider } from "../resolver-providers/providers/ud/ud-resolver-provider";
import { Resolver } from "../resolvers/resolver";
import { DEFAULT_ENS_JSON_RCP_CONNECTION, DEFAULT_FNS_POLYGON_MUMBAI_JSON_RCP_CONNECTION, DEFAULT_UD_JSON_RCP_CONNECTION } from "./default-connections.consts";

export class Web3Resolver extends Resolver {
    constructor() {
        try {
            super([
                new FreenameResolverProvider([DEFAULT_FNS_POLYGON_MUMBAI_JSON_RCP_CONNECTION]),
                new UDResolverProvider([DEFAULT_UD_JSON_RCP_CONNECTION]),
                new ENSResolverProvider([DEFAULT_ENS_JSON_RCP_CONNECTION])
            ])
        }catch(e) {
            console.log("Web3Resolver constructor error ", e);
        }
        }
}