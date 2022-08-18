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

    resolverName: ResolverName | string;

    resolverProvider: IResolverProvider;

    network: NetworkName | string;

    proxyReaderAddress: string;

    proxyWriterAddress: string;

    ownerAddress: string;

    metadataUri: string | undefined;

    imageUrl: string | undefined;

    records: { [key: string]: string } | undefined;

    metadata: any | undefined

    getRecord(key: string): Promise<string | undefined>;

    getManyRecords(keys: string[]): Promise<string[] | undefined>;

    isApprovedOrOwner(address: string): Promise<boolean>

    transfer(addressTo: string, signer: ethers.Signer): Promise<boolean>;

    setApproved(addessToApprove: string, signer: ethers.Signer): Promise<boolean>;

    setRecord(key: string, value: string, signer: ethers.Signer): Promise<boolean>;

    setRecords(keys: string[], values: string[], signer: ethers.Signer): Promise<boolean>;

    refresh(): Promise<IResolvedResource | undefined>
}