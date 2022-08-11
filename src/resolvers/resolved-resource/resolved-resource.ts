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
        network: string,
        proxyReaderAddress: string,
        proxyWriterAddress: string,
        ownerAddress: string,
        metadataUri: string,
        imageUrl: string,
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

        this._realTimeUpdate = false
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

    private _network: string;
    public get network(): string {
        return this._network;
    }
    public set network(value: string) {
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

    private _metadataUri: string;
    public get metadataUri(): string {
        return this._metadataUri;
    }
    public set metadataUri(value: string) {
        this._metadataUri = value;
    }

    private _imageUrl: string;
    public get imageUrl(): string {
        if (this._realTimeUpdate) {
            this.resolverProvider.getImageUrl(this.tokenId);
        }
        return this._imageUrl;
    }
    public set imageUrl(value: string) {
        this._imageUrl = value;
    }

    private _realTimeUpdate: boolean;
    public get realTimeUpdate(): boolean {
        return this._realTimeUpdate;
    }
    public set realTimeUpdate(value: boolean) {
        this._realTimeUpdate = value;
    }

    public get records(): Array<{ [key: string]: string; }> {
        return this.records;
    }

    public getRecord(key: string): string {
        throw new Error("Method not implemented");
    }

    isApprovedOrOwner(address: string): boolean {
        return false;
    }
}