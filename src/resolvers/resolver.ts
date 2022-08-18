import { ResolverProviderRouter } from "../resolver-providers/resolver-provider-router";
import { IResolverProvider } from "../resolver-providers/resolver-provider.interface";
import { IResolvedResource } from "./resolved-resource/resolved-resource.interface";
import { ProviderName } from "./types/resolver-name";

export class Resolver {

	constructor(resolverProviders: IResolverProvider[]) {
		this._resolverProviderRouter = new ResolverProviderRouter(resolverProviders);
	}

	private _resolverProviderRouter: ResolverProviderRouter;

	/**
	 * Set the order in which the resolver providers are interrogated to resolve a name or tokenId.
	 * @param priority the new priority of the providers.
	 */
	public setResolversPriority(priority: Array<ProviderName | string>) {
		this._resolverProviderRouter.setResolverProvidersPriority(priority);
	}

	/**
	 * Adds resolver providers to the Resolver.
	 * @param resolverProviders the resolver providers to add. 
	 */
	public addResolverProviders(resolverProviders: IResolverProvider | IResolverProvider[]) {
		this._resolverProviderRouter.addResolverProviders(resolverProviders);
	}

	/**
	 * Resolve the given domain fullname or tld.
	 * If the domain is valid, exists on the blockchain and can be resolved a `IResolvedResource` is given, otherwise the result is `undefined`.
	 * To obtain the resolved resource a series of calls to the blockchain are made, depending on the chain traffic the `resolve` call can take a couple of seconds to be completed.
	 * @param domainOrTld the domain to resolve. Eg. `"test.web3domain"`
	 * @returns an `IResolvedResource` instance or `undefined`.
	 */
	async resolve(domainOrTld: string): Promise<IResolvedResource | undefined> {
		const resolverProvider = this._resolverProviderRouter.getResolverProviderByDomainOrTld(domainOrTld);
		if (resolverProvider) {
			return await resolverProvider.resolve(domainOrTld);
		}
		return undefined;
	}

	/**
	 * Resolves the given tokenId.
	 * If the tokenId is valid, exists on the blockchain and can be resolved a `IResolvedResource` is given, otherwise the result is `undefined`.
	 * To obtain the resolved resource a series of calls to the blockchain are made, depending on the chain traffic the `resolveFromTokenId` call can take a couple of seconds to be completed.
	 * To speed up the resolution a `ResolverName` can be provided, in this case only the given provider is checked.
	 * @param tokenId the NFT tokenId uint256 string rappresentation to resolve
	 * @param resolverProviderName the provider of the tokenId to resolve
	 * @returns an `IResolvedResource` instance or `undefined`.
	 */
	async resolveFromTokenId(tokenId: string, resolverProviderName?: ProviderName | string): Promise<IResolvedResource | undefined> {
		let resolverProvider;
		if (resolverProviderName) {
			resolverProvider = this._resolverProviderRouter.getResolverProvider(resolverProviderName);
		} else {
			resolverProvider = await this._resolverProviderRouter.findTokenIdResolverProvider(tokenId);
		}
		if (resolverProvider) {
			return resolverProvider.resolveFromTokenId(tokenId);
		}
		return undefined;
	}
}