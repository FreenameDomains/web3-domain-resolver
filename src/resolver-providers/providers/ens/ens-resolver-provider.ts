
import { NetworkConnection, NetworkName } from "../../../networks/connections/network-connection.types";
import { ResolvedResource } from "../../../resolvers/resolved-resource/resolved-resource";
import { IResolvedResource } from "../../../resolvers/resolved-resource/resolved-resource.interface";
import { ResolverName } from "../../../resolvers/types/resolver-name";
import { IResolverProvider } from "../../resolver-provider.interface";
import { BaseResolverProvider } from "../base-resolver-provider";
import { ENS_SUPPORTED_TLDS } from "./ens-resolver-provider.consts";

export class ENSResolverProvider extends BaseResolverProvider implements IResolverProvider {
    constructor(connections: NetworkConnection[]) {
        super(ResolverName.ENS, ENS_SUPPORTED_TLDS, connections);
    }
    
}