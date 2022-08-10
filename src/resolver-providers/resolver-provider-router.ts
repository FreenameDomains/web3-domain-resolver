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

    public getResolverByDomainOrTld(domainOrTld: string): IResolverProvider | undefined {
        const mappedName = NameTools.mapName(domainOrTld);
        if (!mappedName) {
            return undefined;
        }

        for (const resolverProvider of this.resolverProviders) {
            if (resolverProvider.supportedTlds.includes(mappedName.tld) || resolverProvider.supportedTlds.includes("*")) {
                return resolverProvider;
            }
        }
        return undefined;
    }

    public getResolver(name: ResolverName): IResolverProvider | undefined {
        const resolverProvider = this._resolverProviders.find(x => x.name == name);
        return resolverProvider;
    }

    public setResolverProvidersPriority(priority: ResolverName[]) {
        const sortedResolverProviders = _.sortBy(this._resolverProviders, function (resolverProvider: IResolverProvider) {
            return _.indexOf(priority, resolverProvider.name);
        });

        this.resolverProviders = sortedResolverProviders;
    }
}