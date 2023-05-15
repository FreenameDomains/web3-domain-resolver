import { Signer } from "ethers";
import cloneDeep from "lodash.clonedeep";
import { NetworkName } from "../../networks/connections/network-connection.types";
import { IResolverProvider } from "../../resolver-providers/resolver-provider.interface";
import { ResolvedResourceType } from "../types/resolved-resource-type";
import { ProviderName } from "../types/resolver-name";
import { IResolvedResource } from "./resolved-resource.interface";

export class ResolvedResource implements IResolvedResource {

	constructor(input: {
		fullname: string,
		tld: string,
		type: ResolvedResourceType,
		tokenId: string,
		resolverName: ProviderName | string,
		resolverProvider: IResolverProvider,
		network: NetworkName | string,
		proxyReaderAddress: string,
		proxyWriterAddress: string,
		ownerAddress: string,
		metadataUri: string | undefined,
		imageUrl: string | undefined,
		metadata: any | undefined
		records: { [key: string]: string } | undefined,
		domain?: string | undefined,
	},
	) {
		this._fullname = input.fullname;
		this._tld = input.tld;
		this._type = input.type;
		this._tokenId = input.tokenId;
		this._resolverName = input.resolverName;
		this._resolverProvider = input.resolverProvider;
		this._network = input.network;
		this._proxyReaderAddress = input.proxyReaderAddress;
		this._proxyWriterAddress = input.proxyWriterAddress;
		this._ownerAddress = input.ownerAddress;
		this._metadataUri = input.metadataUri;
		this._imageUrl = input.imageUrl;
		this._metadata = input.metadata;
		this._records = input.records;
	}

	private _metadata: any | undefined;
	public get metadata(): any | undefined {
		return this._metadata;
	}
	public set metadata(value: any | undefined) {
		this._metadata = value;
	}

	private _fullname: string;
	public get fullname(): string {
		return this._fullname;
	}
	public set fullname(value: string) {
		this._fullname = value;
	}

	private _tld: string;
	public get tld(): string {
		return this._tld;
	}
	public set tld(value: string) {
		this._tld = value;
	}

	private _domain?: string | undefined;
	public get domain(): string | undefined {
		return this._domain;
	}
	public set domain(value: string | undefined) {
		this._domain = value;
	}

	private _type: ResolvedResourceType;
	public get type(): ResolvedResourceType {
		return this._type;
	}
	public set type(value: ResolvedResourceType) {
		this._type = value;
	}

	private _tokenId: string;
	public get tokenId(): string {
		return this._tokenId;
	}
	public set tokenId(value: string) {
		this._tokenId = value;
	}

	private _resolverName: ProviderName | string;
	public get providerName(): ProviderName | string {
		return this._resolverName;
	}
	public set providerName(value: ProviderName | string) {
		this._resolverName = value;
	}

	private _resolverProvider: IResolverProvider;
	public get resolverProvider(): IResolverProvider {
		return this._resolverProvider;
	}
	public set resolverProvider(value: IResolverProvider) {
		this._resolverProvider = value;
	}

	private _network: NetworkName | string;
	public get network(): NetworkName | string {
		return this._network;
	}
	public set network(value: NetworkName | string) {
		this._network = value;
	}

	private _proxyReaderAddress: string;
	public get proxyReaderAddress(): string {
		return this._proxyReaderAddress;
	}
	public set proxyReaderAddress(value: string) {
		this._proxyReaderAddress = value;
	}

	private _proxyWriterAddress: string;
	public get proxyWriterAddress(): string {
		return this._proxyWriterAddress;
	}
	public set proxyWriterAddress(value: string) {
		this._proxyWriterAddress = value;
	}

	private _ownerAddress: string;
	public get ownerAddress(): string {
		return this._ownerAddress;
	}
	public set ownerAddress(value: string) {
		this._ownerAddress = value;
	}

	private _metadataUri: string | undefined;
	public get uri(): string | undefined {
		return this._metadataUri;
	}
	public set uri(value: string | undefined) {
		this._metadataUri = value;
	}

	private _imageUrl: string | undefined;
	public get imageUrl(): string | undefined {
		return this._imageUrl;
	}
	public set imageUrl(value: string | undefined) {
		this._imageUrl = value;
	}

	private _records: { [key: string]: string; } | undefined;
	public get records(): { [key: string]: string; } | undefined {
		return this._records;
	}

	public async getRecord(key: string): Promise<string | undefined> {
		return await this.resolverProvider.getRecord(this._tokenId, key, this._network);
	}

	public async getManyRecords(keys: string[]): Promise<string[] | undefined> {
		return await this.resolverProvider.getManyRecords(this._tokenId, keys, this._network);
	}

	public async isApprovedOrOwner(address: string): Promise<boolean> {
		return await this.resolverProvider.isApprovedOrOwner(this._tokenId, address, this._network);
	}

	public async transfer(addressTo: string, signer: Signer): Promise<boolean> {
		return await this._resolverProvider.transfer(this, addressTo, signer);
	}

	public async setApproved(addressToApprove: string, signer: Signer): Promise<boolean> {
		return await this._resolverProvider.setApproved(this, addressToApprove, signer);
	}

	public async setRecord(key: string, value: string, signer: Signer): Promise<boolean> {
		return await this._resolverProvider.setRecord(this, key, value, signer);
	}

	public async setRecords(keys: string[], values: string[], signer: Signer): Promise<boolean> {
		return await this._resolverProvider.setRecords(this, keys, values, signer);
	}

	public async setReverse(signer: Signer): Promise<boolean> {
		return await this._resolverProvider.setReverse(this, signer);
	}

	public async refresh(): Promise<IResolvedResource | undefined> {
		let resolvedResource = await this.resolverProvider.resolve(this._fullname);
		if (resolvedResource) {
			this._fullname = resolvedResource.fullname;
			this._tld = resolvedResource.tld;
			this._type = resolvedResource.type;
			this._tokenId = resolvedResource.tokenId;
			this._resolverName = resolvedResource.providerName;
			this._network = resolvedResource.network;
			this._proxyReaderAddress = resolvedResource.proxyReaderAddress;
			this._proxyWriterAddress = resolvedResource.proxyWriterAddress;
			this._ownerAddress = resolvedResource.ownerAddress;
			this._metadataUri = resolvedResource.uri;
			this._imageUrl = resolvedResource.imageUrl;
			this._metadata = cloneDeep(resolvedResource.metadata);
			this._records = cloneDeep(resolvedResource.records);
			resolvedResource = undefined;
		} else {
			return undefined;
		}
		return this;
	}
}