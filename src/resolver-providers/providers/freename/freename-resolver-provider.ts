import { ethers } from "ethers";
import { NetworkName } from "../../../networks/connections/network-connection.types";
import { ContractConnection } from "../../../networks/connections/contract-connection";
import { ResolvedResource } from "../../../resolvers/resolved-resource/resolved-resource";
import { IResolvedResource } from "../../../resolvers/resolved-resource/resolved-resource.interface";
import { ResolvedResourceType } from "../../../resolvers/types/resolved-resource-type";
import { ResolverName } from "../../../resolvers/types/resolver-name";
import { NameTools } from "../../../tools/name-tools";
import { MappedName } from "../../../tools/name-tools.types";
import { IResolverProvider } from "../../resolver-provider.interface";
import { BaseResolverProvider } from "../base-resolver-provider";
import { FREENAME_METADATA_URL } from "./freename-resolver-provider.consts";
import { FreenameResolverTools } from "./freename-resolver-tools";
import { FreenameMetadata } from "./freename-resolver-provider.types";

export class FreenameResolverProvider extends BaseResolverProvider implements IResolverProvider {

    constructor(registryContracts: ContractConnection[]) {
        super(ResolverName.FREENAME, ['*'], registryContracts, FREENAME_METADATA_URL);
    }

    async resolve(domainOrTld: string, options?: {}): Promise<IResolvedResource | undefined> {
        return await this.generateResolvedResource({ fullName: domainOrTld });
    }

    async resolveFromTokenId(tokenId: string): Promise<IResolvedResource | undefined> {
        return await this.generateResolvedResource({ tokenId: tokenId });
    }

    async getMetadata(tokenId: string): Promise<FreenameMetadata | undefined> {
        return await super.getMetadata(tokenId);
    }

    protected getTokenIdFromMappedName(mappedName: MappedName) {
        if (!mappedName) {
            return undefined;
        }
        let fullnameKeccak: string;
        if (mappedName.domain) {
            const domainKeccak = ethers.utils.solidityKeccak256(["string"], [mappedName.domain]);
            fullnameKeccak = ethers.utils.solidityKeccak256(["string", "uint256"], [mappedName.tld, domainKeccak]);
        } else {
            fullnameKeccak = ethers.utils.solidityKeccak256(["string"], [mappedName.tld]);
        }
        if (fullnameKeccak) {
            const tokenId = ethers.BigNumber.from(fullnameKeccak).toString();
            return tokenId;
        }
        return undefined;
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

        const network = FreenameResolverTools.networkNameFormFreenameNetwork(metadata.network)

        const exists = await this.exists(tokenId, network);
        if (!exists) {
            return undefined;
        }

        const ownerAddress = await this.getOwnerAddress(tokenId, network);
        if (!ownerAddress) {
            return undefined;
        }

        const resolverResourceType: ResolvedResourceType = NameTools.getResolvedResourceType(mappedName.type);

        const resolvedResource = new ResolvedResource({
            fullname: mappedName.fullname,
            tld: mappedName.tld,
            type: resolverResourceType,
            tokenId: tokenId,
            resolverName: ResolverName.FREENAME,
            resolverProvider: this,
            imageUrl: metadata.image_url,
            metadataUri: this._metadataUrl,
            network: NetworkName.POLYGON_MUMBAI,
            ownerAddress: ownerAddress,
            proxyReaderAddress: "",
            proxyWriterAddress: "",
            domain: mappedName.domain,
            metadata: metadata,
            records: metadata.properties
        })

        return resolvedResource;
    }
}