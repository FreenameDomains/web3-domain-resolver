import { default as Resolution, Locations, NamingServiceName } from "@unstoppabledomains/resolution";
import { ethers } from "ethers";
import { DefaultTools } from "../../../defaults/default-connections";
import { ERC721_UD_PROXY_ABI } from "../../../defaults/erc721.ud.proxy.abi";
import { ConnectionLibrary } from "../../../networks/connections/connection-library";
import { ContractConnection } from "../../../networks/connections/contract-connection";
import { NetworkName } from "../../../networks/connections/network-connection.types";
import { ProviderName } from "../../../resolvers/types/resolver-name";
import { MappedName } from "../../../tools/name-tools.types";
import { IResolverProvider } from "../../resolver-provider.interface";
import { BaseResolverProvider } from "../base-resolver-provider";
import { UD_SUPPORTED_TLDS, UD_ZIL_TLDS, UNS_ETH_CONTRACT_ADDRESS, UNS_POLYGON_CONTRACT_ADDRESS } from "./ud-resolver-provider.consts";
import { UDResolverTools } from "./ud-resolver-tools";

export class UDResolverProvider extends BaseResolverProvider implements IResolverProvider {

	constructor(options: { connectionLibrary?: ConnectionLibrary } = {}) {
		const ethereumConnection = options.connectionLibrary?.getConnection(NetworkName.ETHEREUM) || DefaultTools.getDefaultConnection(NetworkName.ETHEREUM);
		const ethReadContractAddress = new ContractConnection(ethereumConnection, UNS_ETH_CONTRACT_ADDRESS, ERC721_UD_PROXY_ABI);

		const polygonConnection = options.connectionLibrary?.getConnection(NetworkName.POLYGON) || DefaultTools.getDefaultConnection(NetworkName.POLYGON);
		const polygonReadContractAddress = new ContractConnection(polygonConnection, UNS_POLYGON_CONTRACT_ADDRESS, ERC721_UD_PROXY_ABI);

		super(ProviderName.UD, UD_SUPPORTED_TLDS, [polygonReadContractAddress, ethReadContractAddress], [polygonReadContractAddress, ethReadContractAddress]);
		this._resolution = new Resolution({
			sourceConfig: {
			  uns: {
				locations: {
				  Layer1: {
					url: ethereumConnection.rpcUrl,
					network: 'mainnet',
				  },
				  Layer2: {
					url: polygonConnection.rpcUrl,
					network: 'polygon-mainnet',
				  },
				},
			  },
			  zns: {
				url: 'https://api.zilliqa.com',
				network: 'mainnet',
			  },
			  ens: {
				url: ethereumConnection.rpcUrl,
				network: 'mainnet',
			  },
			},
		  });
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

	public override async getNetworkFromName(mappedName: MappedName): Promise<NetworkName | undefined> {
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

	public override async getNameFromTokenId(tokenId: string, network?: NetworkName | undefined): Promise<string | undefined> {
		const hash = ethers.BigNumber.from(tokenId).toHexString();
		let unhash: string | undefined;

		try {
			unhash = await this._resolution.unhash(hash, NamingServiceName.UNS);
		} catch(e) {
			console.error(e);
		 }

		if (!unhash) {
			try {
				unhash = await this._resolution.unhash(hash, NamingServiceName.ZNS);
			}
			catch(e){
				console.error(e);
			 }
		}

		return unhash;
	}
}