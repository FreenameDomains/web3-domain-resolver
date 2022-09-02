import { NetworkConnection, NetworkName } from "./network-connection.types";

export class ConnectionLibrary {

	constructor(connections: NetworkConnection[]) {
		this._connections = connections || [];
	}

	private _connections: NetworkConnection[];
	public get connections(): NetworkConnection[] {
		return this._connections;
	}
	public set connections(value: NetworkConnection[]) {
		this._connections = value;
	}

	public getConnection(network: NetworkName | string) {
		if (this._connections && network) {
			const connection = this._connections.find(x => x.networkName == network);
			return connection;
		}
		return undefined;
	}

	public setConnection(connection: NetworkConnection) {
		if (this._connections && connection.networkName && connection.rpcUrl) {
			const indexFound = this._connections.findIndex(x => x.networkName == connection.networkName);
			const newConnection: NetworkConnection = {
				networkName: connection.networkName,
				rpcUrl: connection.rpcUrl,
			};
			if (indexFound !== -1) {
				this._connections[indexFound] = newConnection;
			} else {
				this._connections.push(newConnection);
			}
		}
	}
}