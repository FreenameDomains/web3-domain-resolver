import { Signer } from "ethers";
import { NetworkName } from "../../networks/connections/network-connection.types";
import { IResolverProvider } from "../../resolver-providers/resolver-provider.interface";
import { ResolvedResourceType } from "../types/resolved-resource-type";
import { ResolverName } from "../types/resolver-name";
import { IResolvedResource } from "./resolved-resource.interface";

export class ResolvedResource implements IResolvedResource {

    constructor(input: {
        fullname: string,
        tld: string,
        type: ResolvedResourceType,
        tokenId: string,
        resolverName: ResolverName,
        resolverProvider: IResolverProvider,
        network: NetworkName,
        proxyReaderAddress: string,
        proxyWriterAddress: string,
        ownerAddress: string,
        metadataUri: string | undefined,
        imageUrl: string | undefined,
        metadata: any | undefined
        records: { [key: string]: string } | undefined,
        domain?: string | undefined,
    }
    ) {
        this._fullname = input.fullname
        this._tld = input.tld
        this._type = input.type
        this._tokenId = input.tokenId
        this._resolverName = input.resolverName
        this._resolverProvider = input.resolverProvider
        this._network = input.network
        this._proxyReaderAddress = input.proxyReaderAddress
        this._proxyWriterAddress = input.proxyWriterAddress
        this._ownerAddress = input.ownerAddress
        this._metadataUri = input.metadataUri
        this._imageUrl = input.imageUrl
        this._metadata = input.metadata
        this._records = input.records
        this._realTimeUpdates = false
    }

    private _metadata: any | undefined;
    public get metadata(): any | undefined {
        if (this._realTimeUpdates) {
            this.resolverProvider.getMetadata(this.tokenId);
        }
        return this._metadata
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

    private _resolverName: ResolverName;
    public get resolverName(): ResolverName {
        return this._resolverName;
    }
    public set resolverName(value: ResolverName) {
        this._resolverName = value;
    }

    private _resolverProvider: IResolverProvider;
    public get resolverProvider(): IResolverProvider {
        return this._resolverProvider;
    }
    public set resolverProvider(value: IResolverProvider) {
        this._resolverProvider = value;
    }

    private _network: NetworkName;
    public get network(): NetworkName {
        return this._network;
    }
    public set network(value: NetworkName) {
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
        if (this._realTimeUpdates) {
            this.resolverProvider.getOwnerAddress(this.tokenId, this._network);
        }
        return this._ownerAddress;
    }
    public set ownerAddress(value: string) {
        this._ownerAddress = value;
    }

    private _metadataUri: string | undefined;
    public get metadataUri(): string | undefined {
        return this._metadataUri;
    }
    public set metadataUri(value: string | undefined) {
        this._metadataUri = value;
    }

    private _imageUrl: string | undefined;
    public get imageUrl(): string | undefined {
        if (this._realTimeUpdates) {
            this.resolverProvider.getImageUrl(this.tokenId);
        }
        return this._imageUrl;
    }
    public set imageUrl(value: string | undefined) {
        this._imageUrl = value;
    }

    private _records: { [key: string]: string; } | undefined
    public get records(): { [key: string]: string; } | undefined {
        if (this._realTimeUpdates) {
            this.resolverProvider.getRecords(this.tokenId);
        }
        return this._records;
    }

    private _realTimeUpdates: boolean;
    public get realTimeUpdates(): boolean {
        return this._realTimeUpdates;
    }
    public set realTimeUpdates(value: boolean) {
        this._realTimeUpdates = value;
    }

    public getRecord(key: string): string | undefined {
        return this.records ? this.records[key] : undefined;
    }

    public async isApprovedOrOwner(address: string): Promise<boolean> {
        return await this.resolverProvider.isApprovedOrOwner(this._tokenId, address, this._network);
    }

    public async transfer(addressTo: string, signer: Signer): Promise<boolean> {
        return await this._resolverProvider.transfer(this, addressTo, signer);
    }
}