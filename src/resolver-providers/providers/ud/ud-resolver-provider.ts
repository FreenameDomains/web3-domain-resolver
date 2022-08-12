
import { RegistryContractConnection } from "../../../networks/registry-contract/registry-contract";
import { ResolverName } from "../../../resolvers/types/resolver-name";
import { IResolverProvider } from "../../resolver-provider.interface";
import { BaseResolverProvider } from "../base-resolver-provider";
import { UD_METADATA_URL, UD_SUPPORTED_TLDS } from "./ud-resolver-provider.consts";

export class UDResolverProvider extends BaseResolverProvider implements IResolverProvider {

    constructor(registryContracts: RegistryContractConnection[]) {
        super(ResolverName.UD, UD_SUPPORTED_TLDS, registryContracts, UD_METADATA_URL);
    }
}