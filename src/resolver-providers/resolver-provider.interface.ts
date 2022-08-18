
import { NetworkName } from "../networks/connections/network-connection.types";
import { IResolvedResource } from "../resolvers/resolved-resource/resolved-resource.interface";
import { ConnectionLibrary } from "../networks/connections/connection-library";
import { ethers } from "ethers";
import { ResolverName } from "../resolvers/types/resolver-name";

export interface IResolverProvider {

    name: ResolverName | string;
    supportedTlds: string[];
    connectionLibrary?: ConnectionLibrary;
    supportedNetworks: (NetworkName | string)[];

    resolve(domainOrTld: string, options?: {}): Promise<IResolvedResource | undefined>;
    resolveFromTokenId(tokenId: string, network?: NetworkName | string | undefined): Promise<IResolvedResource | undefined>;

    isApprovedOrOwner(tokenId: string, addressToCheck: string, network?: NetworkName | string | undefined): Promise<boolean>;

    transfer(resource: IResolvedResource, addressTo: string, signer: ethers.Signer): Promise<boolean>;
    setApproved(resource: IResolvedResource, addessToApprove: string, signer: ethers.Signer): Promise<boolean>;
    setRecord(resource: IResolvedResource, key: string, value: string, signer: ethers.Signer): Promise<boolean>;
    setRecords(resource: IResolvedResource, keys: string[], values: string[], signer: ethers.Signer): Promise<boolean>;

    getTokenUri(tokenId: string, network?: NetworkName | string | undefined): Promise<string | undefined>
    getMetadata(tokenId: string, network?: NetworkName | string | undefined): Promise<any | undefined>
    getImageUrl(tokenId: string, network?: NetworkName | string | undefined): Promise<string | undefined>;
    exists(tokenId: string, network?: NetworkName | string | undefined): Promise<boolean>;
    getOwnerAddress(tokenId: string, network?: NetworkName | string | undefined): Promise<string | undefined>;
    getRecords(tokenId: string): Promise<{ [key: string]: string } | undefined>;
    getRecord(tokenId: string, key: string, network?: NetworkName | string | undefined): Promise<string | undefined>;
    getManyRecords(tokenId: string, keys: string[], network?: NetworkName | string | undefined): Promise<string[] | undefined>;
}