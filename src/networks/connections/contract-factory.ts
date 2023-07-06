import { NetworkName } from "../../shared/enumerations/enumerations";
import { ConnectionInfo } from "../../shared/interfaces/connection-info.interface";
import { Contract } from "./contract";

export abstract class ContractFactory {

	public static createContract(arg?: ConnectionInfo): Contract {
		const contract = new Contract();
		if (arg) {
			if (arg?.network?.networkName == NetworkName.SOLANA || arg?.network?.networkName == NetworkName?.SOLANA_DEVNET) {
				contract.setMetaplex(arg);
			} else {
				contract.setEthers(arg);
			}
		}
		return contract;
	}

}