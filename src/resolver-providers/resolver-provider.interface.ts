
import { NetworkName } from "../networks/connections/network-connection.types";
import { ContractConnection } from "../networks/connections/contract-connection";
import { IResolvedResource } from "../resolvers/resolved-resource/resolved-resource.interface";

export interface IResolverProvider {

    name: string
    supportedTlds: string[]

    getSupportedNetworks(): NetworkName[];
    getRegistries(): {
        proxyReaderAddress: string;
        proxyWriterAddress: string;
        network: NetworkName;
    }[];
    resolve(domainOrTld: string, options?: {}): Promise<IResolvedResource | undefined>;
    resolveFromTokenId(tokenId: string): Promise<IResolvedResource | undefined>;
    isApprovedOrOwner(tokenId: string, addressToCheck: string, network: NetworkName): Promise<boolean>;
    transfer(resource: IResolvedResource, to: string): Promise<boolean>;
    transferFrom(resource: IResolvedResource, from: string, to: string): Promise<boolean>;
    setApproved(resource: IResolvedResource, addessToApprove: string): Promise<boolean>;
    setRecord(resource: IResolvedResource, key: string, value: string): Promise<boolean>;
    setRecords(resource: IResolvedResource, keys: string[], values: string[]): Promise<boolean>;

    getTokenUri(tokenId: string): Promise<string | undefined>
    getMetadata(tokenId: string): Promise<any | undefined>
    getImageUrl(tokenId: string): Promise<string | undefined>;
    exists(tokenId: string, network: NetworkName): Promise<boolean>;
    getOwnerAddress(tokenId: string, network: NetworkName): Promise<string | undefined>;
    getRecords(tokenId: string): Promise<{ [key: string]: string } | undefined>;
}