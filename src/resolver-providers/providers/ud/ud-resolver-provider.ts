import { default as Resolution, Locations, NamingServiceName } from "@unstoppabledomains/resolution";
import { ethers } from "ethers";
import { ERC721_UD_PROXY_ABI } from "../../../defaults/erc721.ud.proxy.abi";
import { ContractConnection } from "../../../networks/connections/contract-connection";
import { NetworkConnection, NetworkName } from "../../../networks/connections/network-connection.types";
import { ResolverName } from "../../../resolvers/types/resolver-name";
import { MappedName } from "../../../tools/name-tools.types";
import { IResolverProvider } from "../../resolver-provider.interface";
import { DefaultResolverProvider } from "../default-resolver-provider";
import { UD_SUPPORTED_TLDS, UD_ZIL_TLDS, UNS_POLYGON_CONTRACT_ADDRESS } from "./ud-resolver-provider.consts";
import { UDResolverTools } from "./ud-resolver-tools";

export class UDResolverProvider extends DefaultResolverProvider implements IResolverProvider {

    constructor() {
        const connection: NetworkConnection = { networkName: NetworkName.POLYGON, rpcUrl: "" }
        const readContractAddress = new ContractConnection(connection, UNS_POLYGON_CONTRACT_ADDRESS, ERC721_UD_PROXY_ABI);

        super(ResolverName.UD, UD_SUPPORTED_TLDS, [readContractAddress], [readContractAddress]);
        this._resolution = new Resolution();
    }

    private _resolution;

    public async generateTokenId(mappedName: MappedName): Promise<string | undefined> {
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

    public async getNetworkFromName(mappedName: MappedName): Promise<NetworkName | undefined> {
        const network: Locations = await this._resolution.locations([mappedName.fullname]);
        const udNetwork = network[mappedName.fullname]?.blockchain;
        if (!udNetwork) {
            return undefined;
        }

        return UDResolverTools.networkNameFormUdNetwork(udNetwork);
    }

    public async getRecords(tokenId: string): Promise<{ [key: string]: string; } | undefined> {
        const metadata = await this.getMetadata(tokenId);
        return metadata?.properties?.records;
    }

    public async getNameFromTokenId(tokenId: string, network?: NetworkName | undefined): Promise<string | undefined> {
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