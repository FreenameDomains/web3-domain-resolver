import { NetworkName } from "../../networks/connections/network-connection.types";
import { ResolvedResource } from "../../resolvers/resolved-resource/resolved-resource";
import { IResolvedResource } from "../../resolvers/resolved-resource/resolved-resource.interface";
import { ResolverName } from "../../resolvers/types/resolver-name";
import { IResolverProvider } from "../resolver-provider.interface";
import { RegistryContractConnection } from "../../networks/registry-contract/registry-contract";
import axios from 'axios';

export class BaseResolverProvider implements IResolverProvider {
    constructor(name: ResolverName, supportedTlds: string[], regisitryContracts: RegistryContractConnection[], metadataUrl: string) {
        this._name = name;
        this._supportedTlds = supportedTlds;
        this._regisitryContracts = regisitryContracts;
        this._metadataUrl = metadataUrl
    }

    protected _name: ResolverName;
    public get name(): ResolverName {
        return this._name;
    }
    public set name(value: ResolverName) {
        this._name = value;
    }

    protected _supportedTlds: string[];
    public get supportedTlds(): string[] {
        return this._supportedTlds;
    }
    public set supportedTlds(value: string[]) {
        this._supportedTlds = value;
    }

    protected _regisitryContracts: RegistryContractConnection[];
    public get regisitryContracts(): RegistryContractConnection[] {
        return this._regisitryContracts;
    }
    protected set regisitryContracts(value: RegistryContractConnection[]) {
        this._regisitryContracts = value;
    }

    protected _metadataUrl: string;
    public get metadataUrl(): string {
        return this._metadataUrl
    }

    getSupportedNetworks(): NetworkName[] {
        throw new Error("Method not implemented.");
    }
    getRegistries(): { proxyReaderAddress: string; proxyWriterAddress: string; network: NetworkName; }[] {
        throw new Error("Method not implemented.");
    }

    async resolve(domainOrTld: string, options?: {} | undefined): Promise<IResolvedResource | undefined> {
        throw new Error("Method not implemented.");
    }

    async resolveFromTokenId(tokenId: string, network?: string | undefined): Promise<IResolvedResource | undefined> {
        throw new Error("Method not implemented.");
    }

    async getImageUrl(tokenId: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

    async transfer(resource: ResolvedResource, to: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async transferFrom(resource: ResolvedResource, from: string, to: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async setApproved(resource: ResolvedResource, addessToApprove: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async setRecord(resource: ResolvedResource, key: string, value: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async setRecords(resource: ResolvedResource, keys: string[], values: string[]): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async exists(tokenId: string, network: NetworkName): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async isApprovedOrOwner(domainOrTld: string, addressToCheck: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async getMetadata(tokenId: string): Promise<any | undefined> {
        return await this.getHttpsCall(this._metadataUrl + tokenId);
    }

    async getOwnerAddress(tokenId: string, network: NetworkName): Promise<string | undefined> {
        throw new Error("Method not implemented.");
    }

    protected async getHttpsCall(url: string): Promise<any | undefined> {
        try {
            const response = await axios.get(url)
            if (response) {
                console.log("Response ", response.data)
                return response.data
            }
        } catch {
            return undefined;
        }
    }

    protected getRegistryContractConnectionByNetwork(networkName: NetworkName): RegistryContractConnection | undefined {
        const registry = this._regisitryContracts.find(x => x.network == networkName);
        return registry;
    }
}