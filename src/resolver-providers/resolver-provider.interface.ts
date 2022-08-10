import { NetworkName } from "../networks/nework-name";
import { ResolvedResource } from "../resolvers/resolved-resource/resolved-resource";
import { IResolvedResource } from "../resolvers/resolved-resource/resolved-resource.interface";
import { ResolverName } from "../resolvers/types/resolver-name";

export interface IResolverProvider {
    name: ResolverName
    supportedTlds: string[]
    
    getSupportedNetworks(): NetworkName[];
    getRegistries(): {
        proxyReaderAddress: string;
        proxyWriterAddress: string;
        network: NetworkName;
    }[];
    resolve(domainOrTld: string, options?: { resolvers?: { [key: string]: boolean } }): Promise<IResolvedResource | null>;
    resolveFromTokenId(tokenId: string, resolverProvider: ResolverName, network?: string): Promise<IResolvedResource | null>;
    getRecord(resolvedResource: ResolvedResource, key: string): Promise<string>;
    getRecords(resolvedResource: ResolvedResource, keys: string[]): Promise<string[]>;
    getAllRecords(resolvedResource: ResolvedResource): Array<{ [key: string]: string }>;
    isApprovedOrOwner(resolvedResource: ResolvedResource, addressToCheck: string): Promise<boolean>;
    transfer(resource: ResolvedResource, to: string): Promise<boolean>;
    transferFrom(resource: ResolvedResource, from: string, to: string): Promise<boolean>;
    setApproved(resource: ResolvedResource, addessToApprove: string): Promise<boolean>;
    setRecord(resource: ResolvedResource, key: string, value: string): Promise<boolean>;
    setRecords(resource: ResolvedResource, keys: string[], values: string[]): Promise<boolean>;
    getSupportedTlds(): string[];
}