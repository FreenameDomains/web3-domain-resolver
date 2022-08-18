import { ethers } from "ethers";
import { DefaultTools } from "../../../defaults/default-connections";
import { ConnectionLibrary } from "../../../networks/connections/connection-library";
import { ContractConnection } from "../../../networks/connections/contract-connection";
import { NetworkName } from "../../../networks/connections/network-connection.types";
import { ResolverName } from "../../../resolvers/types/resolver-name";
import { MappedName } from "../../../tools/name-tools.types";
import { IResolverProvider } from "../../resolver-provider.interface";
import { DefaultERC721ResolverProvider } from "../default-erc721-resolver-provider";
import { FNS_ABI, FNS_CONTRACT_ADDRESS, FREENAME_WRITE_PROXY } from "./freename-resolver-provider.consts";
import { FreenameMetadata } from "./freename-resolver-provider.types";
import { FreenameResolverTools } from "./freename-resolver-tools";

export class FreenameResolverProvider extends DefaultERC721ResolverProvider implements IResolverProvider {
	constructor(options: { connectionLibrary?: ConnectionLibrary } = {}) {
		const mumbaiConnection = options.connectionLibrary?.getConnection(NetworkName.POLYGON_MUMBAI) || DefaultTools.getDefaultConnection(NetworkName.POLYGON_MUMBAI);

		const readContractAddress = new ContractConnection(mumbaiConnection, FNS_CONTRACT_ADDRESS, FNS_ABI);
		const writeContractAddress = new ContractConnection(mumbaiConnection, FREENAME_WRITE_PROXY, FNS_ABI);
		super(ResolverName.FREENAME, ["*"], [readContractAddress], [writeContractAddress]);
	}

	public async generateTokenId(mappedName: MappedName): Promise<string | undefined> {
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

	public async getNetworkFromName(mappedName: MappedName): Promise<NetworkName | undefined> {
		const tokenId = await this.generateTokenId(mappedName);
		if (!tokenId) {
			return undefined;
		}

		const metadata: FreenameMetadata = await this.getMetadata(tokenId);
		const network = FreenameResolverTools.networkNameFormFreenameNetwork(metadata?.network);
		return network;
	}

	public async getRecords(tokenId: string): Promise<{ [key: string]: string; } | undefined> {
		const metadata: FreenameMetadata = await this.getMetadata(tokenId);
		return metadata?.properties;
	}

	public async getNameFromTokenId(tokenId: string, network?: NetworkName | undefined): Promise<string | undefined> {
		const metadata: FreenameMetadata = await this.getMetadata(tokenId);
		return metadata?.name;
	}
}