import { MappedName } from "../../../shared/types/name-tools.types";
import { IResolverProvider } from "../../../shared/interfaces/resolver-provider.interface";
import { BaseResolverProvider } from "../base-resolver-provider";
import { ENS_ABI, ENS_CONTRACT_ADDRESS, ENS_MAINNET_METADATA_URL, ENS_SUPPORTED_TLDS } from "../../../shared/constants/ens-resolver-provider.consts";
import { ContractConnection } from "../../../networks/connections/contract-connection";
import { ethers } from "ethers";
import { ApiCaller } from "../../../shared/tools/api-caller";
import { ConnectionLibrary } from "../../../networks/connections/connection-library";
import { DefaultTools } from "../../../shared/tools/default-connections";
import { IResolvedResource } from "../../../shared/interfaces/resolved-resource.interface";
import { NameTools } from "../../../shared/tools/name-tools";
import { NetworkName, ProviderName } from "../../../shared/enumerations/enumerations";

export class ENSResolverProvider extends BaseResolverProvider implements IResolverProvider {

	constructor(options: { connectionLibrary?: ConnectionLibrary } = {}) {
		const ethConnection = options.connectionLibrary?.getConnection(NetworkName.ETHEREUM) || DefaultTools.getDefaultConnection(NetworkName.ETHEREUM);
		const ensContract = new ContractConnection({ network: ethConnection, address: ENS_CONTRACT_ADDRESS, abi: ENS_ABI });

		super(ProviderName.ENS, ENS_SUPPORTED_TLDS, [ensContract], [ensContract]);
	}

	public override async reverseResolve(address: string, network?: NetworkName | string | undefined): Promise<string | undefined> {
		let readContracts: ContractConnection[] = [];
		if (network) {
			const readContract = this.getReadContractConnection(network);
			if (readContract) {
				readContracts.push(readContract);
			}
		} else {
			readContracts = this.readContractConnections;
		}

		for (const readContractConnection of readContracts) {
			try {
				const ensName = await readContractConnection.provider.lookupAddress(address);
				if (ensName) {
					const mappedName = NameTools.mapName(ensName);
					if (!mappedName) {
						return undefined;
					}

					const tokenId = await this.generateTokenId(mappedName);
					if (!tokenId) {
						return undefined;
					}

					const owner = await this.getOwnerAddress(tokenId, network);
					if (!owner) {
						return undefined;
					}

					//check https://docs.ens.domains/dapp-developer-guide/resolving-names#reverse-resolution
					if (owner !== address) {
						return undefined;
					}

					return tokenId;
				}
			}
			catch (e) {
				continue;
			}
		}
		return undefined;
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

	public override async getNetworkFromName(): Promise<NetworkName | undefined> {
		return NetworkName.ETHEREUM;
	}

	public override async getRecords(): Promise<{ [key: string]: string; } | undefined> {
		return undefined;
	}

	public override async getNameFromTokenId(tokenId: string, network?: NetworkName | undefined): Promise<string | undefined> {
		const metadata = await this.getMetadata(tokenId, network);
		const name = metadata?.name;

		//Check if the name generates the same tokenId
		//Technically the metadata file can be modified to contain a different name
		if (!name) {
			return undefined;
		}

		const mappedName = NameTools.mapName(name);
		if (!mappedName) {
			return undefined;
		}

		const generatedTokenId = await this.generateTokenId(mappedName);
		if (generatedTokenId !== tokenId) {
			return undefined;
		}

		return name;
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
					return readContractConnection.connection.networkName;
				}
			} catch {
				continue;
			}
		}
	}
}