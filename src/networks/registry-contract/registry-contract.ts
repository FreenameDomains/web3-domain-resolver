import { ethers } from "ethers";
import { NetworkConnection, NetworkName } from "../connections/network-connection.types";

export class RegistryContractConnection {

    constructor(
        connection: NetworkConnection,
        address: string,
        abi: ethers.ContractInterface
    ) {
        this._connection = connection;
        this._address = address;
        this._provider = new ethers.providers.JsonRpcProvider(connection.rcpUrl)
        this._registryContract = new ethers.Contract(address, abi, this._provider);//TODO: set an array of contract, based on the array on connections like {networkname: NetworkName, contract: Contract}[]
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

    private _registryContract: ethers.Contract
    public get registryContract(): ethers.Contract {
        return this._registryContract;
    }

    public get network(): NetworkName {
        return this._connection.networkName;
    }
}