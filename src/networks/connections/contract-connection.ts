import { ethers } from "ethers";
import { Contract } from "./contract";
import { Connection } from "@solana/web3.js";
import { NetworkName } from "../../shared/enumerations/enumerations";
import { ConnectionInfo } from "../../shared/interfaces/connection-info.interface";
import { NetworkConnection } from "../../shared/types/connection.types";
import { ContractFactory } from "./contract-factory";

/**
 * This class represents a connection to a smart contract.
 */
export class ContractConnection {

	/**
	 * Connection info
	 */
	protected _connection: NetworkConnection;
	/**
	 * Smart contract address
	 */
	protected _address: string;
	/**
	 * Smart contract provider
	 */
	protected _provider: ethers.providers.Provider | null = null;
	/**
	 * Smart contract instance
	 */
	protected _contract: Contract;
	/**
	 * Smart contract abi
	 */
	// protected _abi?: ethers.ContractInterface;

	public constructor(arg: ConnectionInfo) {
		const { network, address } = arg || {};
		this._connection = network;
		this._address = address;
		if (!(network instanceof Connection)) {
			this._provider = new ethers.providers.JsonRpcProvider(network.rpcUrl);
		}
		this._contract = ContractFactory.createContract(arg);
	}

	public get connection(): NetworkConnection {
		return this._connection;
	}

	public get address(): string {
		return this._address;
	}

	public get provider(): ethers.providers.Provider {
		return this._provider as ethers.providers.Provider;
	}

	public get contract(): Contract {
		return this._contract;
	}

	public get network(): NetworkName {
		return this._connection.networkName;
	}

	public getTokenId(arg: string): string | undefined {
		return this.contract.getTokeId(arg);
	}


}