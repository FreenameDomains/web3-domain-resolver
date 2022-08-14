
import { ContractConnection } from "../../../networks/connections/contract-connection";
import { ResolverName } from "../../../resolvers/types/resolver-name";
import { IResolverProvider } from "../../resolver-provider.interface";
import { BaseResolverProvider } from "../base-resolver-provider";
import { UD_METADATA_URL, UD_SUPPORTED_TLDS } from "./ud-resolver-provider.consts";

export class UDResolverProvider extends BaseResolverProvider implements IResolverProvider {

    constructor(registryContracts: ContractConnection[]) {
        super(ResolverName.UD, UD_SUPPORTED_TLDS, registryContracts, UD_METADATA_URL);
    }
}