import { ResolverProviderRouter } from "../resolver-providers/resolver-provider-router";
import { IResolverProvider } from "../shared/interfaces/resolver-provider.interface";
import { ProviderName } from "../shared/enumerations/enumerations";
import { IResolvedResource } from "../shared/interfaces/resolved-resource.interface";

export class Resolver {

	constructor(resolverProviders: IResolverProvider[]) {
		this._resolverProviderRouter = new ResolverProviderRouter(resolverProviders);
	}

	private _resolverProviderRouter: ResolverProviderRouter;

	/**
	 * Set the order in which the resolver providers are interrogated to resolve a name or tokenId.
	 * @param priority the new priority of the providers.
	 */
	public setResolversPriority(priority: Array<ProviderName>) {
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
	public async resolve(domainOrTld: string): Promise<IResolvedResource | undefined> {
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
	 * @param tokenId the NFT tokenId uint256 string to resolve
	 * @param resolverProviderName the provider of the tokenId to resolve
	 * @returns an `IResolvedResource` instance or `undefined`.
	 */
	public async resolveFromTokenId(tokenId: string, resolverProviderName?: ProviderName): Promise<IResolvedResource | undefined> {
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

	/**
	 * 
	 * @param address 
	 * @param resolverProviderName 
	 * @returns 
	 */
	public async reverseResolve(address: string, resolverProviderName?: ProviderName): Promise<IResolvedResource | undefined> {
		if (resolverProviderName) {
			const resolverProvider = this._resolverProviderRouter.getResolverProvider(resolverProviderName);
			if (!resolverProvider) {
				return undefined;
			}

			const tokenId = await resolverProvider.reverseResolve(address);
			if (tokenId) {
				return await this.resolveFromTokenId(tokenId, resolverProvider.name);
			}

		} else {
			for (const resolverProvider of this._resolverProviderRouter.resolverProviders) {
				const tokenId = await resolverProvider.reverseResolve(address);
				if (tokenId) {
					return await this.resolveFromTokenId(tokenId, resolverProvider.name);
				}
			}
		}
		return undefined;
	}
}