import { ResolverProviderRouter } from "../resolver-providers/resolver-provider-router";
import { IResolverProvider } from "../resolver-providers/resolver-provider.interface";
import { IResolvedResource } from "./resolved-resource/resolved-resource.interface";
import { ResolverName } from "./types/resolver-name";

export class Resolver {

    constructor(resolverProviders: IResolverProvider[]) {
        this._resolverProviderRouter = new ResolverProviderRouter(resolverProviders);
    }

    private _resolverProviderRouter: ResolverProviderRouter;

    public setResolversPriority(priority: Array<ResolverName>) {
        this._resolverProviderRouter.setResolverProvidersPriority(priority);
    };

    public addResolverProviders(resolverProviders: IResolverProvider | IResolverProvider[]) {
        this._resolverProviderRouter.addResolverProviders(resolverProviders);
    };

    async resolve(domainOrTld: string): Promise<IResolvedResource | undefined> {
        const resolverProvider = this._resolverProviderRouter.getResolverByDomainOrTld(domainOrTld);
        if (resolverProvider) {
            return await resolverProvider.resolve(domainOrTld);
        }
        return undefined;
    };

    async resolveFromTokenId(tokenId: string, resolverProviderName: ResolverName, network?: string): Promise<IResolvedResource | undefined> {
        const resolverProvider = this._resolverProviderRouter.getResolver(resolverProviderName);
        if (resolverProvider) {
            return resolverProvider.resolveFromTokenId(tokenId, network);
        }
        return undefined;
    };

    // async getOwner(domainOrTld: string, options?: { resolvers?: { [key: string]: boolean } }): Promise<string | undefined> {
    //     const resolved = await this.resolve(domainOrTld, options);
    //     return resolved?.ownerAddress;
    // };

    // async isApprovedOrOwner(domainOrTld: string, addressToCheck: string, options?: { resolvers?: { [key: string]: boolean }; }): Promise<boolean> {
    //     const resolver = this.resolverProviderRouter.getResolver(domainOrTld);
    //     if (resolver) {
    //         return await resolver.isApprovedOrOwner(domainOrTld, options);
    //     }
    // };

    // getDomainNameFromTokenId(tokenId: string, resolverProvider: ResolverName, network?: string): Promise<string> {
    //     throw new Error("Method not implemented.");
    // };
}