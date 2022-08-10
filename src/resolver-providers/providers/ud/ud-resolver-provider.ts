import { NetworkName } from "../../../networks/nework-name";
import { ResolvedResource } from "../../../resolvers/resolved-resource/resolved-resource";
import { IResolvedResource } from "../../../resolvers/resolved-resource/resolved-resource.interface";
import { ResolverName } from "../../../resolvers/types/resolver-name";
import { IResolverProvider } from "../../resolver-provider.interface";
import { UD_SUPPORTED_TLDS } from "./ud-resolver-provider.consts";

export class UDResolverProvider implements IResolverProvider {

    constructor() {
        this._name = ResolverName.UD;
        this._supportedTlds = UD_SUPPORTED_TLDS
    }

    private _name: ResolverName;
    public get name(): ResolverName {
        return this._name;
    }
    public set name(value: ResolverName) {
        this._name = value;
    }

    private _supportedTlds: string[];
    public get supportedTlds(): string[] {
        return this._supportedTlds;
    }
    public set supportedTlds(value: string[]) {
        this._supportedTlds = value;
    }

    getName(): string {
        throw new Error("Method not implemented.");
    }
    getSupportedNetworks(): NetworkName[] {
        throw new Error("Method not implemented.");
    }
    getRegistries(): { proxyReaderAddress: string; proxyWriterAddress: string; network: NetworkName; }[] {
        throw new Error("Method not implemented.");
    }
    resolve(domainOrTld: string, options?: { resolvers?: { [key: string]: boolean; } | undefined; } | undefined): Promise<IResolvedResource | null> {
        throw new Error("Method not implemented.");
    }
    resolveFromTokenId(tokenId: string, resolverProvider: ResolverName, network?: string | undefined): Promise<IResolvedResource | null> {
        throw new Error("Method not implemented.");
    }
    getRecord(resolvedResource: ResolvedResource, key: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    getRecords(resolvedResource: ResolvedResource, keys: string[]): Promise<string[]> {
        throw new Error("Method not implemented.");
    }
    getAllRecords(resolvedResource: ResolvedResource): { [key: string]: string; }[] {
        throw new Error("Method not implemented.");
    }
    isApprovedOrOwner(resolvedResource: ResolvedResource, addressToCheck: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    transfer(resource: ResolvedResource, to: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    transferFrom(resource: ResolvedResource, from: string, to: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    setApproved(resource: ResolvedResource, addessToApprove: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    setRecord(resource: ResolvedResource, key: string, value: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    setRecords(resource: ResolvedResource, keys: string[], values: string[]): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getSupportedTlds(): string[] {
        throw new Error("Method not implemented.");
    }
}