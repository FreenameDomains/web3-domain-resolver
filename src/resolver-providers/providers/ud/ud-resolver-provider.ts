
import { NetworkConnection, NetworkName } from "../../../networks/connections/network-connection.types";
import { ResolvedResource } from "../../../resolvers/resolved-resource/resolved-resource";
import { IResolvedResource } from "../../../resolvers/resolved-resource/resolved-resource.interface";
import { ResolverName } from "../../../resolvers/types/resolver-name";
import { IResolverProvider } from "../../resolver-provider.interface";
import { BaseResolverProvider } from "../base-resolver-provider";
import { UD_SUPPORTED_TLDS } from "./ud-resolver-provider.consts";

export class UDResolverProvider extends BaseResolverProvider implements IResolverProvider {

    constructor(connections: NetworkConnection[]) {
        super(ResolverName.UD, UD_SUPPORTED_TLDS, connections);
    }
}