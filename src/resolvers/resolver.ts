import { IResolverProvider } from "../resolver-providers/resolver-provider.interface";
import { ResolvedResource } from "./resolved-resource/resolved-resource";
import { ResolverName } from "./types/resolver-name";

export class Resolver {

    constructor(resolverProviders: IResolverProvider[]) {
        this._resolverProviders = resolverProviders || [];
    }
    
    private _resolverProviders: IResolverProvider[];
    public get resolverProviders(): IResolverProvider[] {
        return this._resolverProviders;
    }
    public set resolverProviders(value: IResolverProvider[]) {
        this._resolverProviders = value;
    }

    setResolversPriority(priority: Array<ResolverName>) {
        throw new Error("Method not implemented.");
    };

    addResolverProvider(resolverProvider: IResolverProvider) {
        this._resolverProviders.push(resolverProvider)
    };

    resolve(domainOrTld: string, options?: { resolvers?: { [key: string]: boolean }; }): Promise<ResolvedResource | null> {
        throw new Error("Method not implemented.");
    };

    resolveFromTokenId(tokenId: string, resolverProvider: ResolverName, network?: string): Promise<ResolvedResource | null> {
        throw new Error("Method not implemented.");
    };

    getOwner(domainOrTld: string, options?: { resolvers?: { [key: string]: boolean } }): Promise<string | null> {
        throw new Error("Method not implemented.");
    };

    isApprovedOrOwner(domainOrTld: string, addressToCheck: string, options?: { resolvers?: { [key: string]: boolean }; }): Promise<boolean> {
        throw new Error("Method not implemented.");
    };

    getDomainNameFromTokenId(tokenId: string, resolverProvider: ResolverName, network?: string): Promise<string> {
        throw new Error("Method not implemented.");
    };
}