import { NetworkConnection, NetworkName } from "./network-connection.types";

export class ConnectionLibrary {

    constructor(connections: NetworkConnection[]) {
        this._connections = connections
    }

    private _connections: NetworkConnection[];
    public get connections(): NetworkConnection[] {
        return this._connections;
    }
    protected set connections(value: NetworkConnection[]) {
        this._connections = value;
    }

    public getConnection(network: NetworkName) {
        if (this._connections && network) {
            const connection = this._connections.find(x => x.networkName == network);
            return connection;
        }
        return undefined;
    };

    public setConnection(network: NetworkName, input: { rcpUrl: string; infuraId: string }) {
        if (this._connections && network && input) {
            const indexFound = this._connections.findIndex(x => x.networkName == network);
            const newConnection: NetworkConnection = {
                networkName: network,
                // infuraId: input.infuraId,
                rcpUrl: input.rcpUrl
            }
            if (indexFound !== -1) {
                this._connections[indexFound] = newConnection
            } else {
                this._connections.push(newConnection);
            }
        }
    };
}