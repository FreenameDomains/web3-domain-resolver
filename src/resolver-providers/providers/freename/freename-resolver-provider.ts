import { ethers } from "ethers";
import cloneDeep from "lodash.clonedeep";
import { DefaultTools } from "../../../shared/tools/default-connections";
import { ConnectionLibrary } from "../../../networks/connections/connection-library";
import { ContractConnection } from "../../../networks/connections/contract-connection";
import { MappedName } from "../../../shared/types/name-tools.types";
import { IResolverProvider } from "../../../shared/interfaces/resolver-provider.interface";
import { BaseResolverProvider } from "../base-resolver-provider";
import { FreenameMetadata } from "../../../shared/types/freename-resolver-provider.types";
import { NameTools } from "../../../shared/tools/name-tools";
import { FreenameNetwork, NetworkName, ProviderName } from "../../../shared/enumerations/enumerations";
import { FREENAME_CONTRACT_CONFS } from "../../../shared/constants/freename-config.constants";
import { ConnectionInfo } from "../../../shared/interfaces/connection-info.interface";
import { NetworkConnection } from "../../../shared/types/connection.types";

export class FreenameResolverProvider extends BaseResolverProvider implements IResolverProvider {
	constructor(options: { connectionLibrary?: ConnectionLibrary, testMode?: boolean } = {}) {

		const { connectionLibrary, testMode = false } = options;

		const readContractConnections: ContractConnection[] = [];
		const writeContractConnections: ContractConnection[] = [];
		const freenameContractConfs = cloneDeep(FREENAME_CONTRACT_CONFS);
		for (const contractConf of freenameContractConfs) {
			if (contractConf.test == testMode) {
				const connection: NetworkConnection = connectionLibrary?.getConnection(contractConf.networkName) || DefaultTools.getDefaultConnection(contractConf.networkName as unknown as NetworkName, { infuraIfAvailable: true });
				const connectionInfo: ConnectionInfo = { network: connection, address: contractConf.address, abi: contractConf.abi as ethers.ContractInterface };
				if (contractConf.type == "read") {
					readContractConnections.push(new ContractConnection(connectionInfo));
				} else if (contractConf.type == "write") {
					writeContractConnections.push(new ContractConnection(connectionInfo));
				}
			}
		}

		super(ProviderName.FREENAME, ["*"], readContractConnections, writeContractConnections);
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

	public async getNetworkFromName(mappedName: MappedName): Promise<FreenameNetwork> {

		const metadata: FreenameMetadata = await this.getMetadata(mappedName.fullname);
		return metadata?.network;
	}

	public async getRecords(tokenId: string, network?: FreenameNetwork): Promise<{ [key: string]: string; } | undefined> {
		const keys = await this.getAllRecordKeys(tokenId, network);
		if (!keys) {
			return undefined;
		}

		const values = await this.getManyRecords(tokenId, keys, network);
		if (!values) {
			return undefined;
		}

		if (keys.length !== values.length) {
			return undefined;
		}

		const records: { [key: string]: string } = {};
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			records[key] = values[i];
		}

		return records;
	}

	public async getAllRecordKeys(tokenId: string, network?: FreenameNetwork | string | undefined): Promise<string[] | undefined> {
		const readContractConnection = await this.getReadContractConnectionFromToken(tokenId, network);
		if (!readContractConnection) {
			return undefined;
		}

		try {
			const contract = readContractConnection.contract;
			return await contract.getAllKeys(tokenId);
		} catch {
			return undefined;
		}
	}

	public async getNameFromTokenId(tokenId: string): Promise<string | undefined> {
		const metadata: FreenameMetadata = await this.getMetadata(tokenId);
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
}