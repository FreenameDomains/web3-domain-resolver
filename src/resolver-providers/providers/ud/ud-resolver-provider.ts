import { default as Resolution, Locations, NamingServiceName } from "@unstoppabledomains/resolution";
import { ethers } from "ethers";
import { DefaultTools } from "../../../shared/tools/default-connections";
import { ERC721_UD_PROXY_ABI } from "../../../shared/constants/erc721.ud.proxy.abi";
import { ConnectionLibrary } from "../../../networks/connections/connection-library";
import { ContractConnection } from "../../../networks/connections/contract-connection";
import { MappedName } from "../../../shared/types/name-tools.types";
import { IResolverProvider } from "../../../shared/interfaces/resolver-provider.interface";
import { BaseResolverProvider } from "../base-resolver-provider";
import { UD_SUPPORTED_TLDS, UD_ZIL_TLDS, UNS_ETH_CONTRACT_ADDRESS, UNS_POLYGON_CONTRACT_ADDRESS } from "../../../shared/constants/ud-resolver-provider.consts";
import { UDResolverTools } from "./ud-resolver-tools";
import { NetworkName, ProviderName, UdNetwork } from "../../../shared/enumerations/enumerations";

export class UDResolverProvider extends BaseResolverProvider implements IResolverProvider {

	constructor(options: { connectionLibrary?: ConnectionLibrary } = {}) {
		const ethereumConnection = options.connectionLibrary?.getConnection(UdNetwork.ETHEREUM) || DefaultTools.getDefaultConnection(NetworkName.ETHEREUM);
		const ethReadContractAddress = new ContractConnection({ network: ethereumConnection, address: UNS_ETH_CONTRACT_ADDRESS, abi: ERC721_UD_PROXY_ABI });

		const polygonConnection = options.connectionLibrary?.getConnection(UdNetwork.POLYGON) || DefaultTools.getDefaultConnection(NetworkName.POLYGON);
		const polygonReadContractAddress = new ContractConnection({ network: polygonConnection, address: UNS_POLYGON_CONTRACT_ADDRESS, abi: ERC721_UD_PROXY_ABI });

		super(ProviderName.UD, UD_SUPPORTED_TLDS, [polygonReadContractAddress, ethReadContractAddress], [polygonReadContractAddress, ethReadContractAddress]);
		this._resolution = new Resolution();
	}

	private _resolution;

	public override async generateTokenId(mappedName: MappedName): Promise<string | undefined> {
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

	public override async getNetworkFromName(mappedName: MappedName): Promise<UdNetwork | undefined> {
		try {
			const network: Locations = await this._resolution.locations([mappedName.fullname]);
			const udNetwork = network[mappedName.fullname]?.blockchain;
			if (!udNetwork) {
				return undefined;
			}

			return UDResolverTools.networkNameFormUdNetwork(udNetwork);
		} catch {
			return undefined;
		}
	}

	public override async getRecords(tokenId: string): Promise<{ [key: string]: string; } | undefined> {
		const metadata = await this.getMetadata(tokenId);
		return metadata?.properties?.records;
	}

	public override async getNameFromTokenId(tokenId: string): Promise<string | undefined> {
		const hash = ethers.BigNumber.from(tokenId).toHexString();
		let unhash: string | undefined;

		try {
			unhash = await this._resolution.unhash(hash, NamingServiceName.UNS);
		} catch {
			//
		}

		if (!unhash) {
			try {
				unhash = await this._resolution.unhash(hash, NamingServiceName.ZNS);
			}
			catch {
				//
			}
		}

		return unhash;
	}
}