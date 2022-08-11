import { NetworkConnection, NetworkName } from "../../networks/connections/network-connection.types";
import { ConnectionLibrary } from "../../networks/connections/resolver-provider-library";
import { ResolvedResource } from "../../resolvers/resolved-resource/resolved-resource";
import { IResolvedResource } from "../../resolvers/resolved-resource/resolved-resource.interface";
import { ResolverName } from "../../resolvers/types/resolver-name";
import { IResolverProvider } from "../resolver-provider.interface";

export class BaseResolverProvider implements IResolverProvider {
    constructor(name: ResolverName, supportedTlds: string[], connections: NetworkConnection[]) {
        this._name = name;
        this._supportedTlds = supportedTlds;
        this._connectionLibrary = new ConnectionLibrary(connections);
    }

    public get connections() {
        return this._connectionLibrary.connections;
    }
    public set connections(connections: NetworkConnection[]) {
        this._connectionLibrary = new ConnectionLibrary(connections);
    }

    protected _connectionLibrary: ConnectionLibrary;
    public get connectionLibrary(): ConnectionLibrary {
        return this._connectionLibrary;
    }
    protected set connectionLibrary(value: ConnectionLibrary) {
        this._connectionLibrary = value;
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
    async isApprovedOrOwner(domainOrTld: string, addressToCheck: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}