import _ from "lodash";
import { ResolverName } from "../resolvers/types/resolver-name";
import { NameTools } from "../tools/name-tools";
import { IResolverProvider } from "./resolver-provider.interface";

export class ResolverProviderRouter {
	constructor(resolverProviders: IResolverProvider[]) {
		this._resolverProviders = resolverProviders || [];
	}

	private _resolverProviders: IResolverProvider[];
	public get resolverProviders(): IResolverProvider[] {
		return this._resolverProviders;
	}
	protected set resolverProviders(value: IResolverProvider[]) {
		this._resolverProviders = value;
	}

	public addResolverProviders(resolverProvider: IResolverProvider | IResolverProvider[]) {
		if (Array.isArray(resolverProvider)) {
			this._resolverProviders.push(...resolverProvider);
		}
		else {
			this._resolverProviders.push(resolverProvider);
		}
	}

	public getResolverProviderByDomainOrTld(domainOrTld: string): IResolverProvider | undefined {
		const mappedName = NameTools.mapName(domainOrTld);
		if (!mappedName) {
			return undefined;
		}

		for (const resolverProvider of this.resolverProviders) {
			if (resolverProvider.supportedTlds.includes(mappedName.tld)) {
				return resolverProvider;
			}
		}
		for (const resolverProvider of this.resolverProviders) {
			if (resolverProvider.supportedTlds.includes("*")) {
				return resolverProvider;
			}
		}
		return undefined;
	}

	public async findTokenIdResolverProvider(tokenId: string): Promise<IResolverProvider | undefined> {
		for (const resolverProvider of this._resolverProviders) {
			try {
				const exists = await resolverProvider.exists(tokenId);
				if (exists) {
					return resolverProvider;
				}
			} catch {
				continue;
			}
		}
		return undefined;
	}

	public getResolverProvider(name: ResolverName | string): IResolverProvider | undefined {
		const resolverProvider = this._resolverProviders.find(x => x.name == name);
		return resolverProvider;
	}

	public setResolverProvidersPriority(priority: (ResolverName | string)[]) {

		const missing: (ResolverName | string)[] = [];
		for (const resolverProvider of this._resolverProviders) {
			if (!priority.includes(resolverProvider.name)) {
				missing.push(resolverProvider.name);
			}
		}

		const fullPriority = [...priority, ...missing];

		const sortedResolverProviders = _.sortBy(this._resolverProviders, function (resolverProvider: IResolverProvider) {
			return _.indexOf(fullPriority, resolverProvider.name);
		});

		this.resolverProviders = sortedResolverProviders;
	}
}