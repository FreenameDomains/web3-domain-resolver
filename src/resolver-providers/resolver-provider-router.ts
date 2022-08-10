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
    public set resolverProviders(value: IResolverProvider[]) {
        this._resolverProviders = value;
    }

    public getResolver(domainOrTld: string): IResolverProvider | undefined {
        const mappedName = NameTools.mapName(domainOrTld);
        if (!mappedName) {
            return undefined;
        }

        for (const resolverProvider of this.resolverProviders) {
            if (resolverProvider.supportedTlds.includes(mappedName.tld)) {
                return resolverProvider;
            }
        }
        return undefined;
    }
}