import { FreenameContractConfig } from "../types/freename-resolver-provider.types";
import { FreenameNetwork } from "../enumerations/enumerations";
import { FNS_ABI } from "./freename-abi.constants";


export const FREENAME_CONTRACT_CONFS: FreenameContractConfig[] = [
	{
		address: "0x6034C0d80e6d023FFd62Ba48e6B5c13afe72D143",
		networkName: FreenameNetwork.POLYGON_MUMBAI,
		test: true,
		type: "read",
		abi: FNS_ABI,
	},
	{
		address: "0x6034C0d80e6d023FFd62Ba48e6B5c13afe72D143",
		networkName: FreenameNetwork.POLYGON_MUMBAI,
		test: true,
		type: "write",
		abi: FNS_ABI,
	},
	{
		address: "0x465ea4967479A96D4490d575b5a6cC2B4A4BEE65",
		networkName: FreenameNetwork.POLYGON,
		test: false,
		type: "read",
		abi: FNS_ABI,
	},
	{
		address: "0x465ea4967479A96D4490d575b5a6cC2B4A4BEE65",
		networkName: FreenameNetwork.POLYGON,
		test: false,
		type: "write",
		abi: FNS_ABI,
	},
	{
		address: "0x465ea4967479A96D4490d575b5a6cC2B4A4BEE65",
		networkName: FreenameNetwork.CRONOS,
		test: false,
		type: "read",
		abi: FNS_ABI,
	},
	{
		address: "0x465ea4967479A96D4490d575b5a6cC2B4A4BEE65",
		networkName: FreenameNetwork.CRONOS,
		test: false,
		type: "write",
		abi: FNS_ABI,
	},
	{
		address: "0x465ea4967479A96D4490d575b5a6cC2B4A4BEE65",
		networkName: FreenameNetwork.BSC,
		test: false,
		type: "read",
		abi: FNS_ABI,
	},
	{
		address: "0x465ea4967479A96D4490d575b5a6cC2B4A4BEE65",
		networkName: FreenameNetwork.BSC,
		test: false,
		type: "write",
		abi: FNS_ABI,
	},
	{
		address: "0x465ea4967479A96D4490d575b5a6cC2B4A4BEE65",
		networkName: FreenameNetwork.AURORA,
		test: false,
		type: "read",
		abi: FNS_ABI,
	},
	{
		address: "0x465ea4967479A96D4490d575b5a6cC2B4A4BEE65",
		networkName: FreenameNetwork.AURORA,
		test: false,
		type: "write",
		abi: FNS_ABI,
	},
	{
		address: "6cMUj75fcW7kaCJbFcSuAGjES22RMfnxg8QX8FJEprPL",
		networkName: FreenameNetwork.SOLANA,
		test: false,
		type: "read",
	},
	{
		address: "6cMUj75fcW7kaCJbFcSuAGjES22RMfnxg8QX8FJEprPL",
		networkName: FreenameNetwork.SOLANA,
		test: false,
		type: "write",
	},
	{
		address: "6cMUj75fcW7kaCJbFcSuAGjES22RMfnxg8QX8FJEprPL",
		networkName: FreenameNetwork.SOLANA_DEVNET,
		test: true,
		type: "read",
	},
	{
		address: "6cMUj75fcW7kaCJbFcSuAGjES22RMfnxg8QX8FJEprPL",
		networkName: FreenameNetwork.SOLANA_DEVNET,
		test: true,
		type: "write",
	},
];
