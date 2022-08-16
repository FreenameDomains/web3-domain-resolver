
import { ResolverName } from "../../../resolvers/types/resolver-name";
import { IResolverProvider } from "../../resolver-provider.interface";
import { BaseResolverProvider } from "../base-resolver-provider";
import { UD_METADATA_URL, UD_SUPPORTED_TLDS, UD_ZIL_TLDS } from "./ud-resolver-provider.consts";
import { MappedName } from "../../../tools/name-tools.types";
import { ethers } from "ethers";
import { default as Resolution, NamingServiceName, TokenUriMetadata, UnsSource, ZnsSource } from '@unstoppabledomains/resolution';
import { IResolvedResource } from "../../../resolvers/resolved-resource/resolved-resource.interface";
import { ResolvedResource } from "../../../resolvers/resolved-resource/resolved-resource";
import { NameTools } from "../../../tools/name-tools";
import { NetworkName } from "../../../networks/connections/network-connection.types";
import { ResolvedResourceType } from "../../../resolvers/types/resolved-resource-type";
import { ConnectionLibrary } from "../../../networks/connections/connection-library";

export class UDResolverProvider extends BaseResolverProvider implements IResolverProvider {

    constructor(options: { connectionLibrary?: ConnectionLibrary } = {}) {
        super(ResolverName.UD, UD_SUPPORTED_TLDS, options);

        let unsSource: UnsSource | undefined;
        const ethConnection = this._connectionLibrary?.getConnection(NetworkName.ETHEREUM);
        const polygonConnection = this._connectionLibrary?.getConnection(NetworkName.POLYGON)
        if (ethConnection && polygonConnection) {
            unsSource = {
                locations: {
                    Layer1: {
                        url: ethConnection.rpcUrl,
                        network: 'mainnet'
                    },
                    Layer2: {
                        url: polygonConnection.rpcUrl,
                        network: 'polygon-mainnet',
                    },
                },
            }
        }

        let znsSource: ZnsSource | undefined;
        const zilConnection = this._connectionLibrary?.getConnection(NetworkName.ZILLIQA);
        if (zilConnection) {
            znsSource = {
                network: 'mainnet',
                url: zilConnection.rpcUrl
            }
        }


        this._resolution = new Resolution(
            {
                sourceConfig: {
                    uns: unsSource,
                    zns: znsSource
                }
            }
        );
    }

    private _resolution;

    async resolve(domainOrTld: string): Promise<IResolvedResource | undefined> {
        return await this.generateResolvedResource({ fullName: domainOrTld });
    }

    async resolveFromTokenId(tokenId: string, network?: string | undefined): Promise<IResolvedResource | undefined> {
        return await this.generateResolvedResource({ tokenId: tokenId });
    }

    async getTokenUri(tokenId: string): Promise<string | undefined> {
        return UD_METADATA_URL + tokenId;
        // const domainName = await this.unHashName(tokenId);
        // if (!domainName) {
        //     return undefined;
        // }
        // return await this._resolution.tokenURI(domainName);
    }

    async getMetadata(tokenId: string): Promise<TokenUriMetadata | undefined> {
        return await super.getMetadata(tokenId);
        // const domainName = await this.unHashName(tokenId);
        // if (!domainName) {
        //     return undefined;
        // }
        // return await this._resolution.tokenURIMetadata(domainName);
    }

    protected async generateResolvedResource(input: { tokenId?: string, fullName?: string }): Promise<ResolvedResource | undefined> {
        if (!input) {
            return undefined;
        }
        if (!input.fullName && !input.tokenId) {
            return undefined;
        }

        let mappedName: MappedName | undefined;
        let tokenId: string | undefined;
        if (input.fullName) {
            mappedName = NameTools.mapName(input.fullName);
            if (!mappedName) {
                return undefined;
            }

            tokenId = this.getTokenIdFromMappedName(mappedName);
        } else if (input.tokenId) {
            tokenId = input.tokenId;
        }
        if (!tokenId) {
            return undefined;
        }

        const metadata = await this.getMetadata(tokenId);
        if (!metadata) {
            return undefined;
        }

        if (!mappedName) {
            mappedName = NameTools.mapName(metadata.name);
        }
        if (!mappedName) {
            return undefined;
        }

        const exists = await this._resolution.isRegistered(mappedName.fullname);
        if (!exists) {
            return undefined;
        }

        const ownerAddress = await this._resolution.owner(mappedName.fullname);
        if (!ownerAddress) {
            return undefined;
        }

        const metadataUri = await this.getTokenUri(tokenId);

        const resolverResourceType: ResolvedResourceType = NameTools.getResolvedResourceType(mappedName.type);

        const resolvedResource = new ResolvedResource({
            fullname: mappedName.fullname,
            tld: mappedName.tld,
            type: resolverResourceType,
            tokenId: tokenId,
            resolverName: ResolverName.UD,
            resolverProvider: this,
            imageUrl: metadata.image,
            metadataUri: metadataUri,
            network: NetworkName.POLYGON,
            ownerAddress: ownerAddress,
            proxyReaderAddress: "",
            proxyWriterAddress: "",
            domain: mappedName.domain,
            metadata: metadata,
            records: (metadata as any)?.properties?.records
        })

        return resolvedResource;
    }

    protected getTokenIdFromMappedName(mappedName: MappedName): string | undefined {
        try {
            let namingService: NamingServiceName;
            if (UD_ZIL_TLDS.includes(mappedName.tld)) {
                namingService = NamingServiceName.ZNS;
            } else {
                namingService = NamingServiceName.UNS;
            }
            const nameHash = this._resolution.namehash(mappedName.fullname, namingService);
            const tokenId = ethers.BigNumber.from(nameHash).toString();
            return tokenId;
        }
        catch {
            return undefined;
        }
    }

    private async unHashName(tokenId: string): Promise<string | undefined> {
        const hash = ethers.BigNumber.from(tokenId).toHexString();
        let unhash: string | undefined;
        try {
            unhash = await this._resolution.unhash(hash, NamingServiceName.UNS);
        } catch { }
        if (!unhash) {
            try {
                unhash = await this._resolution.unhash(hash, NamingServiceName.UNS);
            }
            catch { }
        }
        return unhash;
    }
}