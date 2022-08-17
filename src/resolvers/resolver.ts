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
        const resolverProvider = this._resolverProviderRouter.getResolverProviderByDomainOrTld(domainOrTld);
        if (resolverProvider) {
            return await resolverProvider.resolve(domainOrTld);
        }
        return undefined;
    };

    async resolveFromTokenId(tokenId: string, resolverProviderName?: ResolverName): Promise<IResolvedResource | undefined> {
        let resolverProvider
        if (resolverProviderName) {
            resolverProvider = this._resolverProviderRouter.getResolverProvider(resolverProviderName);
        } else {
            resolverProvider = await this._resolverProviderRouter.findTokenIdResolverProvider(tokenId);
        }
        if (resolverProvider) {
            return resolverProvider.resolveFromTokenId(tokenId);
        }
        return undefined;
    };
}