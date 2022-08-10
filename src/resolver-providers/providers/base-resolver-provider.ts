import { NetworkConnection } from "../../networks/connections/network-connection.types";
import { ConnectionLibrary } from "../../networks/connections/resolver-provider-library";
import { ResolverName } from "../../resolvers/types/resolver-name";

export class BaseResolverProvider {
    constructor(name: ResolverName, supportedTlds: string[], connections: NetworkConnection[]) {
        this._name = name;
        this._supportedTlds = supportedTlds;
        this._connectionLibrary = new ConnectionLibrary(connections);
    }

    public get connections() {
        return this._connectionLibrary.connections;
    }
    public set connections(connections: NetworkConnection[]) {
        this._connectionLibrary = new ConnectionLibrary(connections);
    }

    protected _connectionLibrary: ConnectionLibrary;
    public get connectionLibrary(): ConnectionLibrary {
        return this._connectionLibrary;
    }
    protected set connectionLibrary(value: ConnectionLibrary) {
        this._connectionLibrary = value;
    }

    protected _name: ResolverName;
    public get name(): ResolverName {
        return this._name;
    }
    public set name(value: ResolverName) {
        this._name = value;
    }

    protected _supportedTlds: string[];
    public get supportedTlds(): string[] {
        return this._supportedTlds;
    }
    public set supportedTlds(value: string[]) {
        this._supportedTlds = value;
    }
}