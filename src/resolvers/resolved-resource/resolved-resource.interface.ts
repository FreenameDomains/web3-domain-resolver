import { ethers } from "ethers";
import { NetworkName } from "../../networks/connections/network-connection.types";
import { IResolverProvider } from "../../resolver-providers/resolver-provider.interface";
import { ResolvedResourceType } from "../types/resolved-resource-type";
import { ProviderName } from "../types/resolver-name";

export interface IResolvedResource {
    /**
     * The full name of the domain or the tld.
     */
    fullname: string;

    /**
     * The second level domain portion of the full name, without trailing ".". Can be `undefined` in case of a tld.
     */
    domain?: string | undefined;

    /**
     * The top level domain portion of the full name, without starting ".".
     */
    tld: string;

    /**
    * Indicates if the resolved resource is a `tld` or a `domain`.
    */
    type: ResolvedResourceType;

    /**
    * The uint256 string of the resolved resource NFT.
    */
    tokenId: string;

    /**
    * The name of the provider used to resolve the resource. Eg. "freename" or "ens".
    */
    providerName: ProviderName | string;

    /**
    * The resolver provider instance used to resolve the resource.
    */
    resolverProvider: IResolverProvider;

    /**
    * The network where the resolved resource NFT is located.
    */
    network: NetworkName | string;

    /**
    * The address of the smart contract from where the data was read.
    */
    proxyReaderAddress: string;

    /**
    * The address of the smart contract where the data can be written.
    */
    proxyWriterAddress: string;

    /**
    * The address of current owner of the resolved resource NFT.
    */
    ownerAddress: string;

    /**
    * The uri of the resolved resource NFT.
    */
    uri: string | undefined;

    /**
    * The image url portion of the `metadata`, usually the content of `metadata.image_url`.
    */
    imageUrl: string | undefined;

    /**
    * The record portion of the `metadata`, usually the content of `metadata.properties`.
    */
    records: { [key: string]: string } | undefined;

    /**
    * The metadata of the resolved resource, usually the result of a http GET call from the `uri`.
    */
    metadata: any | undefined

    /**
     * Get the value of the record with the specified key from the blockchain.
     * @param key the key of the record
     */
    getRecord(key: string): Promise<string | undefined>;

    /**
     * Get the value of the record with the specified key from the blockchain registry.
     * @param keys the keys of the records
     */
    getManyRecords(keys: string[]): Promise<string[] | undefined>;

    /**
     * Checks on the blockchain registry if the given address is the owner or an approved address for the resolved resource NFT.
     * @param address the address to check
     */
    isApprovedOrOwner(address: string): Promise<boolean>

    /**
     * Calls the blockchain registry to change the owner of the resolved resource NFT. Usually the `signer` must be the owner or an approved address of the resolved resource NFT.
     * @param addressTo the address to transfer the resolved resource NFT to
     * @param signer a `ether.Signer` wallet. If `signer.provider` is `undefined` the `provider` of the resolved resource's `resolverProvider` is used.
     */
    transfer(addressTo: string, signer: ethers.Signer): Promise<boolean>;

    /**
     * Calls the blockchain registry to approve the `addressToApprove` to the resolved resource NFT eg. to give the address permission to transfer. Usually the `signer` must be the owner of the resolved resource NFT.
     * @param addressToApprove the address to approve.
     * @param signer a `ether.Signer` wallet. If `signer.provider` is `undefined` the `provider` of the resolved resource's `resolverProvider` is used.
     */
    setApproved(addressToApprove: string, signer: ethers.Signer): Promise<boolean>;

    /**
     * Calls the blockchain registry to set the specified key-value pair as a record on the resolved resource NFT.
     * @param key the key of the record
     * @param value the value of the record
     * @param signer a `ether.Signer` wallet. If `signer.provider` is `undefined` the `provider` of the resolved resource's `resolverProvider` is used.
     */
    setRecord(key: string, value: string, signer: ethers.Signer): Promise<boolean>;

    /**
     * Calls the blockchain registry to set the specified key-value pairs as records on the resolved resource NFT. 
     * The `keys` and `values` array must be in order: the first key-value pair will be the first string of the `keys` array as key and the first string of the `values` array as value, and so on.
     * @param keys the keys of the records
     * @param values the values of the records
     * @param signer a `ether.Signer` wallet. If `signer.provider` is `undefined` the `provider` of the resolved resource's `resolverProvider` is used. 
     */
    setRecords(keys: string[], values: string[], signer: ethers.Signer): Promise<boolean>;

    /**
     * Set the `signer` address as a reverse resolution record of the resolved resource NFT.
     * @param signer a `ether.Signer` wallet. If `signer.provider` is `undefined` the `provider` of the resolved resource's `resolverProvider` is used. 
     */
    setReverse(signer: ethers.Signer): Promise<boolean>;

    /**
     * Updates all the fields of the current resolved resource.
     */
    refresh(): Promise<IResolvedResource | undefined>
}