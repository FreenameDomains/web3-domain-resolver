import { NetworkName } from "../../../networks/connections/network-connection.types";
import { ProviderName } from "../../../resolvers/types/resolver-name";
import { MappedName } from "../../../tools/name-tools.types";
import { IResolverProvider } from "../../resolver-provider.interface";
import { DefaultERC721ResolverProvider } from "../default-erc721-resolver-provider";
import { ENS_ABI, ENS_CONTRACT_ADDRESS, ENS_MAINNET_METADATA_URL, ENS_SUPPORTED_TLDS } from "./ens-resolver-provider.consts";
import { ContractConnection } from "../../../networks/connections/contract-connection";
import { ethers } from "ethers";
import { ApiCaller } from "../../../tools/api-caller";
import { ConnectionLibrary } from "../../../networks/connections/connection-library";
import { DefaultTools } from "../../../defaults/default-connections";
import { IResolvedResource } from "../../../resolvers/resolved-resource/resolved-resource.interface";

export class ENSResolverProvider extends DefaultERC721ResolverProvider implements IResolverProvider {

	constructor(options: { connectionLibrary?: ConnectionLibrary } = {}) {
		const ethConnection = options.connectionLibrary?.getConnection(NetworkName.ETHEREUM) || DefaultTools.getDefaultConnection(NetworkName.ETHEREUM);
		const ensContract = new ContractConnection(ethConnection, ENS_CONTRACT_ADDRESS, ENS_ABI);

		super(ProviderName.ENS, ENS_SUPPORTED_TLDS, [ensContract], [ensContract]);
	}

	public override async exists(tokenId: string, network?: NetworkName | undefined): Promise<boolean> {
		const readContractConnection = await super.getReadContractConnectionFromToken(tokenId, network);
		if (!readContractConnection) {
			return false;
		}
		try {
			const res = await readContractConnection.contract.available(tokenId);
			return !res;
		} catch {
			return false;
		}
	}

	public override async generateTokenId(mappedName: MappedName): Promise<string | undefined> {
		if (!mappedName.domain) {
			return undefined;
		}
		try {
			const labelHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(mappedName.domain));
			console.log(labelHash);
			const tokenId = ethers.BigNumber.from(labelHash).toString();
			return tokenId;
		} catch {
			return undefined;
		}
	}

	public override async getTokenUri(tokenId: string, network?: NetworkName | undefined): Promise<string | undefined> {
		//There is no token uri https://docs.ens.domains/dapp-developer-guide/ens-as-nft#metadata
		return undefined;
	}

	public override async getMetadata(tokenId: string, network?: NetworkName | undefined): Promise<any | undefined> {
		const readContractConnection = await super.getReadContractConnectionFromToken(tokenId, network);
		if (!readContractConnection) {
			return false;
		}
		//https://metadata.ens.domains/docs
		const metadataUrl = ENS_MAINNET_METADATA_URL + readContractConnection.address + "/" + tokenId;
		return ApiCaller.getHttpsCall(metadataUrl);
	}

	public override async getNetworkFromName(mappedName: MappedName): Promise<NetworkName | undefined> {
		return NetworkName.ETHEREUM;
	}

	public override async getRecords(tokenId: string): Promise<{ [key: string]: string; } | undefined> {
		return undefined;
	}

	public override async getNameFromTokenId(tokenId: string, network?: NetworkName | undefined): Promise<string | undefined> {
		const metadata = await this.getMetadata(tokenId, network);
		return metadata?.name;
	}

	public override async setRecord(resource: IResolvedResource, key: string, value: string, signer: ethers.Signer): Promise<boolean> {
		return false;
	}

	public override async getManyRecords(tokenId: string, keys: string[], network?: NetworkName | undefined): Promise<string[] | undefined> {
		return undefined;
	}

	protected override async getTokenIdNetwork(tokenId: string): Promise<NetworkName | string | undefined> {
		for (const readContractConnection of this.readContractConnections) {
			try {
				const res = await readContractConnection.contract.available(tokenId);
				if (!res) {
					return readContractConnection.network;
				}
			} catch {
				continue;
			}
		}
	}
}