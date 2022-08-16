import { ethers } from "ethers";
import { NetworkConnection, NetworkName } from "./network-connection.types";

export class ContractConnection {

    constructor(
        connection: NetworkConnection,
        address: string,
        abi: ethers.ContractInterface
    ) {
        this._connection = connection;
        this._address = address;
        this._provider = new ethers.providers.JsonRpcProvider(connection.rpcUrl);
        this._contract = new ethers.Contract(address, abi, this._provider);
    }

    private _connection: NetworkConnection;
    public get connection(): NetworkConnection {
        return this._connection;
    }

    private _address: string;
    public get address(): string {
        return this._address;
    }

    private _provider: ethers.providers.Provider;
    public get provider(): ethers.providers.Provider {
        return this._provider;
    }

    private _contract: ethers.Contract
    public get contract(): ethers.Contract {
        return this._contract;
    }

    public get network(): NetworkName {
        return this._connection.networkName;
    }
}