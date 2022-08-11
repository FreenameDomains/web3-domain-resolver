import { IResolverProvider } from "../../resolver-providers/resolver-provider.interface";
import { ResolvedResourceType } from "../types/resolved-resource-type";
import { ResolverName } from "../types/resolver-name";

export interface IResolvedResource {
    fullname: string;

    domain?: string | undefined;

    tld: string;

    type: ResolvedResourceType;

    tokenId: string;

    resolverName: ResolverName;

    resolverProvider: IResolverProvider;

    network: string;

    proxyReaderAddress: string;

    proxyWriterAddress: string;

    ownerAddress: string;

    metadataUri: string;

    imageUrl: string;

    records: Array<{ [key: string]: string }>;

    /**
    * If enabled every time a `get` of a field is requested a call to the resolver provider is made, to get the real time update from the blockchain registry.
    * Defaults to `false`
    */
    realTimeUpdate: boolean

    getRecord(key: string): string;

    isApprovedOrOwner(address: string): boolean
}