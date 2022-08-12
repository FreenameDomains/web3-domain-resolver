import { RegistryContractConnection } from "../networks/registry-contract/registry-contract";
import { FreenameResolverProvider } from "../resolver-providers/providers/freename/freename-resolver-provider";
import { DEFAULT_FNS_POLYGON_MUMBAI_JSON_RCP_CONNECTION, FNS_CONTRACT_ADDRESS, FREENAME_NS_ABI } from "../resolver-providers/providers/freename/freename-resolver-provider.consts";
import { Resolver } from "../resolvers/resolver";

export class Web3Resolver extends Resolver {
    constructor() {

        const freenameRegistry: RegistryContractConnection = new RegistryContractConnection(DEFAULT_FNS_POLYGON_MUMBAI_JSON_RCP_CONNECTION, FNS_CONTRACT_ADDRESS, FREENAME_NS_ABI)

        super([new FreenameResolverProvider([freenameRegistry])])
    }
}