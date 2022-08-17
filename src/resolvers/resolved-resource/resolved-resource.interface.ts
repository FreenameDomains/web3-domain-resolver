import { ethers } from "ethers";
import { NetworkName } from "../../networks/connections/network-connection.types";
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

    network: NetworkName;

    proxyReaderAddress: string;

    proxyWriterAddress: string;

    ownerAddress: string;

    metadataUri: string | undefined;

    imageUrl: string | undefined;

    records: { [key: string]: string } | undefined;

    metadata: any | undefined

    /**
    * If enabled every time a `get` of a field is requested a call to the resolver provider is made, to get the real time update from the blockchain registry.
    * Defaults to `false`
    */
    realTimeUpdates: boolean

    getRecord(key: string): string | undefined;

    isApprovedOrOwner(address: string): Promise<boolean>

    transfer(addressTo: string, signer: ethers.Signer): Promise<boolean>;
}