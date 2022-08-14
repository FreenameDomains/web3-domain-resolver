import { ContractConnection } from "../networks/connections/contract-connection";
import { FreenameResolverProvider } from "../resolver-providers/providers/freename/freename-resolver-provider";
import { DEFAULT_FNS_POLYGON_MUMBAI_JSON_RCP_CONNECTION, FNS_CONTRACT_ADDRESS, FNS_ABI } from "../resolver-providers/providers/freename/freename-resolver-provider.consts";
import { Resolver } from "../resolvers/resolver";

export class Web3Resolver extends Resolver {
    constructor() {

        const freenameRegistry: ContractConnection = new ContractConnection(DEFAULT_FNS_POLYGON_MUMBAI_JSON_RCP_CONNECTION, FNS_CONTRACT_ADDRESS, FNS_ABI)
        const freenameResolverProvider = new FreenameResolverProvider([freenameRegistry]);

        super([freenameResolverProvider])
    }
}