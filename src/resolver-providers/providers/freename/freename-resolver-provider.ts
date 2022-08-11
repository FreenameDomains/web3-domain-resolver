import { ethers } from "ethers";
import { NetworkConnection, NetworkName } from "../../../networks/connections/network-connection.types";
import { ResolvedResource } from "../../../resolvers/resolved-resource/resolved-resource";
import { IResolvedResource } from "../../../resolvers/resolved-resource/resolved-resource.interface";
import { ResolvedResourceType } from "../../../resolvers/types/resolved-resource-type";
import { ResolverName } from "../../../resolvers/types/resolver-name";
import { NameTools } from "../../../tools/name-tools";
import { MappedName, NameType } from "../../../tools/name-tools.types";
import { IResolverProvider } from "../../resolver-provider.interface";
import { BaseResolverProvider } from "../base-resolver-provider";
import { FNS_CONTRACT_ADDRESS, FREENAME_NS_ABI } from "./freename-resolver-provider.consts";

export class FreenameResolverProvider extends BaseResolverProvider implements IResolverProvider {

    constructor(connections: NetworkConnection[]) {
        super(ResolverName.FREENAME, ['*'], connections);

        let providers: ethers.providers.JsonRpcProvider[] = []
        for (const connection of connections) {
            const newProvider = new ethers.providers.JsonRpcProvider(connection.rcpUrl)
            providers.push(newProvider);
        }
        this._providers = providers;
        this._fnsContract = new ethers.Contract(FNS_CONTRACT_ADDRESS, FREENAME_NS_ABI, this._providers[0]);//TODO: set an array of contract, based on the array on connections like {networkname: NetworkName, contract: Contract}[]
    }

    private _providers: ethers.providers.JsonRpcProvider[];
    private _fnsContract: ethers.Contract

    async resolve(domainOrTld: string, options?: {}): Promise<IResolvedResource | undefined> {
        return await this.generateResolvedResource({ fullName: domainOrTld });
    }

    async resolveFromTokenId(tokenId: string, network?: string | undefined): Promise<IResolvedResource | undefined> {
        return await this.generateResolvedResource({ tokenId: tokenId });
    }

    async exists(tokenId: string): Promise<boolean> {
        const exists = await this._fnsContract.exists(tokenId);
        return exists;
    }

    protected generateTokenId(mappedName: MappedName) {
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
        if (!input || (!input.fullName && !input.tokenId)) {
            return undefined;
        }

        console.log("START")
        let mappedName: MappedName | undefined;
        let tokenId: string | undefined;
        if (input.fullName) {
            const mappedNameOrUnd = NameTools.mapName(input.fullName);
            if (!mappedNameOrUnd) {
                console.log("mappedname")
                return undefined;
            }
            mappedName = mappedNameOrUnd

            const tokenIdOrUnd = this.generateTokenId(mappedName);
            if (!tokenIdOrUnd) {
                console.log("tokenId")
                return undefined;
            }
            tokenId = tokenIdOrUnd;
        } else if (input.tokenId) {
            //TODO needs a metadata uri to get the additional data
            tokenId = input.tokenId;
            mappedName = {//MOCK
                fullname: "test",
                tld: "test",
                type: NameType.TLD,
                domain: undefined
            }
        }
        if (!tokenId || !mappedName) {
            return undefined;
        }

        const exists = await this.exists(tokenId);
        if (!exists) {
            console.log("exists")
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
            imageUrl: "",
            metadataUri: "",
            network: "",
            ownerAddress: "",
            proxyReaderAddress: "",
            proxyWriterAddress: "",
            domain: mappedName.domain,
        })

        return resolvedResource;
    }
}