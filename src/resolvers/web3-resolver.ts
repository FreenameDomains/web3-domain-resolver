import { ConnectionLibrary } from "../networks/connections/connection-library";
import { ENSResolverProvider } from "../resolver-providers/providers/ens/ens-resolver-provider";
import { FreenameResolverProvider } from "../resolver-providers/providers/freename/freename-resolver-provider";
import { UDResolverProvider } from "../resolver-providers/providers/ud/ud-resolver-provider";
import { Resolver } from "./resolver";

export class Web3Resolver extends Resolver {
	constructor(connectionLibrary?: ConnectionLibrary) {
		const freenameResolverProvider = new FreenameResolverProvider({ connectionLibrary: connectionLibrary });
		const udResolverProvider = new UDResolverProvider({ connectionLibrary: connectionLibrary });
		const ensResolverProvider = new ENSResolverProvider({ connectionLibrary: connectionLibrary });

		super([freenameResolverProvider, udResolverProvider, ensResolverProvider]);
	}
}