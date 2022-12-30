import { NetworkName } from "../networks/connections/network-connection.types";
import { IResolvedResource } from "../resolvers/resolved-resource/resolved-resource.interface";
import { ConnectionLibrary } from "../networks/connections/connection-library";
import { ethers } from "ethers";
import { ProviderName } from "../resolvers/types/resolver-name";
import { ResolveOptions } from "./resolver-provider.types";

export interface IResolverProvider {

    /**
     * The name of the provider. Eg. 'Freename'
     */
    name: ProviderName | string;

    /**
     * The list of the provider's supported tlds, is `"*"` in case all the tlds are supported.
     */
    supportedTlds: string[];

    /**
     * The connection library containing the specific connections to the netowrks. If none is provided the default connection library is used.
     */
    connectionLibrary?: ConnectionLibrary | undefined;

    /**
     * The supported networks of the current `IResolverProvider`
     */
    supportedNetworks: (NetworkName | string)[];

    /**
     * Resolves the given domain fullname or tld.
     * If the domain is valid, exists on the blockchain and can be resolved a `IResolvedResource` is given, otherwise the result is `undefined`.
     * To obtain the resolved resource a series of calls to the blockchain are made, depending on the chain traffic the `resolve` call can take a couple of seconds to be completed.
     * @param domainOrTld the domain to resolve. Eg. `"test.web3domain"`
     * @returns an `IResolvedResource` instance or undefined.
     */
    resolve(domainOrTld: string, options?: ResolveOptions): Promise<IResolvedResource | undefined>;

    /**
     * Resolves the given tokenId.
     * If the tokenId is valid, exists on the blockchain and can be resolved a `IResolvedResource` is given, otherwise the result is `undefined`.
     * To obtain the resolved resource a series of calls to the blockchain are made, depending on the chain traffic the `resolveFromTokenId` call can take a couple of seconds to be completed.
     * @param tokenId the NFT tokenId uint256 string rappresentation to resolve.
     * @param network the network where the NFT is located. If not available every network is scanned to search the `tokenId` NFT.
     * @returns an `IResolvedResource` instance or undefined.
     */
    resolveFromTokenId(tokenId: string, network?: NetworkName | string | undefined): Promise<IResolvedResource | undefined>;

    /**
     * Given a wallet address returns the NFT tokenId uint256 string rappresentation.
     * @param address the wallet address set as the reverse resolve of a domain.
     */
    reverseResolve(address: string): Promise<string | undefined>;

    /**
     * Checks on the blockchain registry if the given address is the owner or an approved address for the resolved resource NFT.
     * @param tokenId the NFT tokenId uint256 string rappresentation to resolve.
     * @param addressToCheck the address to check
     * @param network the network where the NFT is located. If not available every network is scanned to search the `tokenId` NFT.
     */
    isApprovedOrOwner(tokenId: string, addressToCheck: string, network?: NetworkName | string | undefined): Promise<boolean>;

    /**
     * Calls the blockchain registry to change the owner of the `resource` NFT. Usually the `signer` must be the owner or an approved address of the resolved resource NFT.
     * @param resource a `IResolvedResource` instance
     * @param addressTo the address to transfer the resolved resource NFT to
     * @param signer a `ether.Signer` wallet. If `signer.provider` is `undefined` the `provider` of the resolved resource's `resolverProvider` is used.
     */
    transfer(resource: IResolvedResource, addressTo: string, signer: ethers.Signer): Promise<boolean>;

    /**
     * Calls the blockchain registry to approve the `addessToApprove` to the `resource` NFT eg. to give the address permission to transfer. Usually the `signer` must be the owner of the resolved resource NFT.
     * @param resource an `IResolvedResource` instance.
     * @param addessToApprove the address to approve.
     * @param signer a `ether.Signer` wallet. If `signer.provider` is `undefined` the `provider` of the resolved resource's `resolverProvider` is used.
     */
    setApproved(resource: IResolvedResource, addessToApprove: string, signer: ethers.Signer): Promise<boolean>;

    /**
     * Calls the blockchain registry to set the specified key-value pair as a record on the resolved resource NFT.
     * @param resource an `IResolvedResource` instance.
     * @param key the key of the record
     * @param value the value of the record
     * @param signer a `ether.Signer` wallet. If `signer.provider` is `undefined` the `provider` of the resolved resource's `resolverProvider` is used.
     */
    setRecord(resource: IResolvedResource, key: string, value: string, signer: ethers.Signer): Promise<boolean>;

    /**
     * Calls the blockchain registry to set the specified key-value pairs as records on the resolved resource NFT. 
     * The `keys` and `values` array must be in order: the first key-value pair will be the first string of the `keys` array as key and the first string of the `values` array as value, and so on.
     * @param resource an `IResolvedResource` instance.
     * @param keys the keys of the records
     * @param values the values of the records
     * @param signer a `ether.Signer` wallet. If `signer.provider` is `undefined` the `provider` of the resolved resource's `resolverProvider` is used. 
     */
    setRecords(resource: IResolvedResource, keys: string[], values: string[], signer: ethers.Signer): Promise<boolean>;

    /**
     * Set the `signer` address as a reverse resolution record of the resolved resource NFT.
     * @param resource an `IResolvedResource` instance.
     * @param signer a `ether.Signer` wallet. If `signer.provider` is `undefined` the `provider` of the resolved resource's `resolverProvider` is used.
     */
    setReverse(resource: IResolvedResource, signer: ethers.Signer): Promise<boolean>;

    /**
     * Gets the uri of the `tokenId` NFT.
     * @param tokenId the NFT tokenId uint256 string rappresentation.
     * @param network the network where the NFT is located. If not available every network is scanned to search the `tokenId` NFT.
     * @returns the uri string or undefined
     */
    getTokenUri(tokenId: string, network?: NetworkName | string | undefined): Promise<string | undefined>

    /**
     * Calls the `uri` of the `tokenId` NFT and returns the resulting metadata.
     * @param tokenId the NFT tokenId uint256 string rappresentation.
     * @param network the network where the NFT is located. If not available every network is scanned to search the `tokenId` NFT.
     */
    getMetadata(tokenId: string, network?: NetworkName | string | undefined): Promise<any | undefined>

    /**
     * Gets the image url portion of the NFT metadata, usually the content of `metadata.image_url`.
     * @param tokenId the NFT tokenId uint256 string rappresentation.
     * @param network the network where the NFT is located. If not available every network is scanned to search the `tokenId` NFT.
     */
    getImageUrl(tokenId: string, network?: NetworkName | string | undefined): Promise<string | undefined>;

    /**
     * Check if the `tokenId` exists on the blockchain.
     * @param tokenId the NFT tokenId uint256 string rappresentation.
     * @param network the network where the NFT is located. If not available every network is scanned to search the `tokenId` NFT.
     */
    exists(tokenId: string, network?: NetworkName | string | undefined): Promise<boolean>;

    /**
     * Get the current owner address of the `tokenId`.
     * @param tokenId the NFT tokenId uint256 string rappresentation.
     * @param network the network where the NFT is located. If not available every network is scanned to search the `tokenId` NFT.
     */
    getOwnerAddress(tokenId: string, network?: NetworkName | string | undefined): Promise<string | undefined>;

    /**
     * Gets the record portion of the NFT metadata, usually the content of `metadata.properties`.
     * @param tokenId the NFT tokenId uint256 string rappresentation.
     * @param network the network where the NFT is located. If not available every network is scanned to search the `tokenId` NFT.
     */
    getRecords(tokenId: string, network?: NetworkName | string | undefined): Promise<{ [key: string]: string } | undefined>;

    /**
     * Get the value of the record with the specified key from the blockchain.
     * @param tokenId the NFT tokenId uint256 string rappresentation.
     * @param key the key of the record
     * @param network the network where the NFT is located. If not available every network is scanned to search the `tokenId` NFT.
     */
    getRecord(tokenId: string, key: string, network?: NetworkName | string | undefined): Promise<string | undefined>;

    /**
     * Get the value of the record with the specified key from the blockchain registry.
     * @param tokenId the NFT tokenId uint256 string rappresentation.
     * @param keys the keys of the records
     * @param network the network where the NFT is located. If not available every network is scanned to search the `tokenId` NFT.
     */
    getManyRecords(tokenId: string, keys: string[], network?: NetworkName | string | undefined): Promise<string[] | undefined>;
}