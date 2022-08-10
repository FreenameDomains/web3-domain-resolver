
import { NetworkConnection, NetworkName } from "../../../networks/connections/network-connection.types";
import { ResolvedResource } from "../../../resolvers/resolved-resource/resolved-resource";
import { IResolvedResource } from "../../../resolvers/resolved-resource/resolved-resource.interface";
import { ResolverName } from "../../../resolvers/types/resolver-name";
import { IResolverProvider } from "../../resolver-provider.interface";
import { BaseResolverProvider } from "../base-resolver-provider";
import { UD_SUPPORTED_TLDS } from "./ud-resolver-provider.consts";

export class UDResolverProvider extends BaseResolverProvider implements IResolverProvider {

    constructor(connections: NetworkConnection[]) {
        super(ResolverName.UD, UD_SUPPORTED_TLDS, connections);
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
    resolve(domainOrTld: string, options?: { resolvers?: { [key: string]: boolean; } | undefined; } | undefined): Promise<IResolvedResource | undefined> {
        throw new Error("Method not implemented.");
    }
    resolveFromTokenId(tokenId: string, network?: string | undefined): Promise<IResolvedResource | undefined> {
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