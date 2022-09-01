import { ethers } from "ethers";
import { DefaultTools } from "../../../defaults/default-connections";
import { ConnectionLibrary } from "../../../networks/connections/connection-library";
import { ContractConnection } from "../../../networks/connections/contract-connection";
import { NetworkName } from "../../../networks/connections/network-connection.types";
import { IResolvedResource } from "../../../resolvers/resolved-resource/resolved-resource.interface";
import { ProviderName } from "../../../resolvers/types/resolver-name";
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
		super(ProviderName.FREENAME, ["*"], [readContractAddress], [writeContractAddress]);
	}

	public override async getRecord(tokenId: string, key: string, network?: NetworkName | string | undefined): Promise<string | undefined> {
		const readContractConnection = await this.getReadContractConnectionFromToken(tokenId, network);
		if (!readContractConnection) {
			return undefined;
		}

		try {
			return await readContractConnection.contract.getRecord(key, tokenId);
		}
		catch {
			return undefined;
		}
	}

	public override async getManyRecords(tokenId: string, keys: string[], network?: NetworkName | string | undefined): Promise<string[] | undefined> {
		const readContractConnection = await this.getReadContractConnectionFromToken(tokenId, network);
		if (!readContractConnection) {
			return undefined;
		}

		try {
			return await readContractConnection.contract.getManyRecords(keys, tokenId);
		} catch {
			return undefined;
		}
	}

	public override async setRecord(resource: IResolvedResource, key: string, value: string, signer: ethers.Signer): Promise<boolean> {
		const writeContract = this.getWriteContractWithSigner(resource.network, signer);
		if (!writeContract) {
			return false;
		}

		try {
			const tx = await writeContract.setRecord(key, value, resource.tokenId);
			const approveReceipt = await tx.wait();
			if (approveReceipt) {
				return true;
			}
			return false;
		} catch (e) {
			console.log(e)
			return false;
		}
	}

	public override async setRecords(resource: IResolvedResource, keys: string[], values: string[], signer: ethers.Signer): Promise<boolean> {
		const writeContract = this.getWriteContractWithSigner(resource.network, signer);
		if (!writeContract) {
			return false;
		}

		try {
			const tx = await writeContract.setManyRecords(keys, values, resource.tokenId);
			const approveReceipt = await tx.wait();
			if (approveReceipt) {
				return true;
			}
			return false;
		} catch (e) {
			return false;
		}
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

	public async getAllRecordKeys(tokenId: string, network?: NetworkName | string | undefined): Promise<string[] | undefined> {
		const readContractConnection = await this.getReadContractConnectionFromToken(tokenId, network);
		if (!readContractConnection) {
			return undefined;
		}

		try {
			return await readContractConnection.contract.getAllKeys(tokenId);
		} catch {
			return undefined;
		}
	}

	public async getNameFromTokenId(tokenId: string, network?: NetworkName | undefined): Promise<string | undefined> {
		const metadata: FreenameMetadata = await this.getMetadata(tokenId);
		return metadata?.name;
	}
}