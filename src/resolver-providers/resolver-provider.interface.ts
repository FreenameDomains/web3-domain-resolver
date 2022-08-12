
import { NetworkName } from "../networks/connections/network-connection.types";
import { RegistryContractConnection } from "../networks/registry-contract/registry-contract";
import { IResolvedResource } from "../resolvers/resolved-resource/resolved-resource.interface";
import { ResolverName } from "../resolvers/types/resolver-name";

export interface IResolverProvider {

    name: ResolverName
    supportedTlds: string[]
    regisitryContracts: RegistryContractConnection[];

    getSupportedNetworks(): NetworkName[];
    getRegistries(): {
        proxyReaderAddress: string;
        proxyWriterAddress: string;
        network: NetworkName;
    }[];
    resolve(domainOrTld: string, options?: {}): Promise<IResolvedResource | undefined>;
    resolveFromTokenId(tokenId: string, network?: string): Promise<IResolvedResource | undefined>;
    isApprovedOrOwner(domainOrTld: string, addressToCheck: string): Promise<boolean>;
    transfer(resource: IResolvedResource, to: string): Promise<boolean>;
    transferFrom(resource: IResolvedResource, from: string, to: string): Promise<boolean>;
    setApproved(resource: IResolvedResource, addessToApprove: string): Promise<boolean>;
    setRecord(resource: IResolvedResource, key: string, value: string): Promise<boolean>;
    setRecords(resource: IResolvedResource, keys: string[], values: string[]): Promise<boolean>;

    getMetadata(tokenId: string): Promise<any | undefined>
    getImageUrl(tokenId: string): Promise<string | undefined>;
    exists(tokenId: string, network: NetworkName): Promise<boolean>;
    getOwnerAddress(tokenId: string, network: NetworkName): Promise<string | undefined>;
}