export const DEFAULT_RPC_URL: Record<string, string> = {
	bsc: "https://bsc-dataseed1.ninicoin.io",
	ethereum: "https://eth-mainnet.public.blastapi.io",
	polygon: "https://rpc-mainnet.matic.quiknode.pro",
	aurora: "https://mainnet.aurora.dev",
	cronos: "https://node.croswap.com/rpc",

	//TEST
	"polygon-mumbai": "https://rpc-mumbai.matic.today",
	hardhat: "http://127.0.0.1:8545/",
	zil: "",
	solana: "",
	"solana-devnet": "",
};

//these urls can only connect to Freename smart contract addresses
export const DEFAULT_INFURA_RPC_URL: Record<string, string> = {
	polygon: "https://polygon-mainnet.infura.io/v3/de21d7dc37334e459e15e172ee9d45f2",
	ethereum: "https://mainnet.infura.io/v3/de21d7dc37334e459e15e172ee9d45f2",
	aurora: "https://aurora-mainnet.infura.io/v3/de21d7dc37334e459e15e172ee9d45f2",
	"polygon-mumbai": "https://polygon-mumbai.infura.io/v3/80f2c70ca3f04b289ad19f385d51651b",
	bsc: "",
	zil: "",
	hardhat: "",
	cronos: "",
	solana: "",
	"solana-devnet": "",
};