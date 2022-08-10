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

    getRecord(key: string): string;

    isApprovedOrOwner(address: string): boolean
}