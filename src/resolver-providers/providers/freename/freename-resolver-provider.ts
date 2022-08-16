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
import { DEFAULT_FNS_POLYGON_MUMBAI_PROVIDER, FNS_ABI, FNS_CONTRACT_ADDRESS, FREENAME_METADATA_URL } from "./freename-resolver-provider.consts";
import { FreenameResolverTools } from "./freename-resolver-tools";
import { FreenameMetadata } from "./freename-resolver-provider.types";
import { ConnectionLibrary } from "../../../networks/connections/connection-library";

export class FreenameResolverProvider extends BaseResolverProvider implements IResolverProvider {

    constructor(options: { connectionLibrary?: ConnectionLibrary } = {}) {
        super(ResolverName.FREENAME, ['*'], options);

        const mumbaiConnection = this._connectionLibrary?.getConnection(NetworkName.POLYGON_MUMBAI) || DEFAULT_FNS_POLYGON_MUMBAI_PROVIDER;
        this._regisitryContracts = [new ContractConnection(mumbaiConnection, FNS_CONTRACT_ADDRESS, FNS_ABI)];
    }

    protected _regisitryContracts: ContractConnection[];
    public get regisitryContracts(): ContractConnection[] {
        return this._regisitryContracts;
    }
    protected set regisitryContracts(value: ContractConnection[]) {
        this._regisitryContracts = value;
    }

    getSupportedNetworks(): NetworkName[] {
        return this.regisitryContracts.map(x => x.network);
    }

    async resolve(domainOrTld: string, options?: {}): Promise<IResolvedResource | undefined> {
        console.log("FREENAME resolve of ", domainOrTld)
        return await this.generateResolvedResource({ fullName: domainOrTld });
    }

    async resolveFromTokenId(tokenId: string): Promise<IResolvedResource | undefined> {
        console.log("FREENAME resolveFromTokenId of ", tokenId)
        return await this.generateResolvedResource({ tokenId: tokenId });
    }

    async getTokenUri(tokenId: string): Promise<string | undefined> {
        return FREENAME_METADATA_URL + tokenId;
    }

    async getMetadata(tokenId: string): Promise<FreenameMetadata | undefined> {
        return await super.getMetadata(tokenId);
    }

    async getOwnerAddress(tokenId: string, network: NetworkName): Promise<string | undefined> {
        const registry = this.getRegistryContractConnectionByNetwork(network);
        if (!registry) {
            return undefined;
        }
        const ownerAddress: string = await registry.contract.ownerOf(tokenId);
        return ownerAddress;
    }

    async exists(tokenId: string, network: NetworkName): Promise<boolean> {
        const registryConnection = this.getRegistryContractConnectionByNetwork(network);
        if (!registryConnection) {
            return false;
        }
        const exists: boolean = await registryConnection.contract.exists(tokenId);
        return exists;
    }

    async isApprovedOrOwner(tokenId: string, addressToCheck: string, network: NetworkName): Promise<boolean> {
        const registryConnection = this.getRegistryContractConnectionByNetwork(network);
        if (!registryConnection) {
            return false;
        }
        const isApprovedOrOwner: boolean = await registryConnection.contract.isApprovedOrOwner(tokenId, addressToCheck);
        return isApprovedOrOwner;
    }

    protected getTokenIdFromMappedName(mappedName: MappedName) {
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
            console.log("Missing input");
            return undefined;
        }
        if (!input.fullName && !input.tokenId) {
            console.log("Missing input");
            return undefined;
        }

        let mappedName: MappedName | undefined;
        let tokenId: string | undefined;
        if (input.fullName) {
            mappedName = NameTools.mapName(input.fullName);
            if (!mappedName) {
                console.log("unable to map name");
                return undefined;
            }

            tokenId = this.getTokenIdFromMappedName(mappedName);
        } else if (input.tokenId) {
            tokenId = input.tokenId;
        }
        if (!tokenId) {
            console.log("Missing tokenId");
            return undefined;
        }

        const metadata = await this.getMetadata(tokenId);
        if (!metadata) {
            console.log("Missing metadata");
            return undefined;
        }

        if (!mappedName) {
            console.log("Missing mapped name");
            mappedName = NameTools.mapName(metadata.name);
        }
        if (!mappedName) {
            console.log("Missing mapped name");
            return undefined;
        }

        const network = FreenameResolverTools.networkNameFormFreenameNetwork(metadata.network)

        const exists = await this.exists(tokenId, network);
        if (!exists) {
            console.log("exists: false");
            return undefined;
        }

        const ownerAddress = await this.getOwnerAddress(tokenId, network);
        if (!ownerAddress) {
            console.log("Missing owner address");
            return undefined;
        }

        const metadataUri = await this.getTokenUri(tokenId);

        const resolverResourceType: ResolvedResourceType = NameTools.getResolvedResourceType(mappedName.type);

        const resolvedResource = new ResolvedResource({
            fullname: mappedName.fullname,
            tld: mappedName.tld,
            type: resolverResourceType,
            tokenId: tokenId,
            resolverName: ResolverName.FREENAME,
            resolverProvider: this,
            imageUrl: metadata.image_url,
            metadataUri: metadataUri,
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

    protected getRegistryContractConnectionByNetwork(networkName: NetworkName): ContractConnection | undefined {
        const registry = this._regisitryContracts.find(x => x.network == networkName);
        return registry;
    }
}