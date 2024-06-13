export const DEFAULT_RPC_URL: Record<string, string> = {
  bsc: "https://bsc-dataseed1.ninicoin.io",
  ethereum: "https://eth-mainnet.public.blastapi.io",
  polygon: "https://rpc-mainnet.matic.quiknode.pro",
  aurora: "https://mainnet.aurora.dev",
  cronos: "https://node.croswap.com/rpc",

  //TEST
  // mumbai overriden by amoy (mumbai deprecated)
  "polygon-mumbai": "https://rpc-amoy.polygon.technology",
  "polygon-amoy": "https://rpc-amoy.polygon.technology",
  hardhat: "http://127.0.0.1:8545/",
  zil: "",
  solana: "",
  "solana-devnet": "",
  base: "https://base.llamarpc.com",
  "base-sepolia": "https://base-sepolia-rpc.publicnode.com",
  avalanche: "https://avalanche-c-chain-rpc.publicnode.com",
  "avalanche-fuji": "https://avalanche-fuji-c-chain-rpc.publicnode.com",
};

//these urls can only connect to Freename smart contract addresses
export const DEFAULT_INFURA_RPC_URL: Record<string, string> = {
  polygon:
    "https://polygon-mainnet.infura.io/v3/de21d7dc37334e459e15e172ee9d45f2",
  ethereum: "https://mainnet.infura.io/v3/de21d7dc37334e459e15e172ee9d45f2",
  aurora:
    "https://aurora-mainnet.infura.io/v3/de21d7dc37334e459e15e172ee9d45f2",
  // mumbai overriden by amoy (mumbai deprecated)
  "polygon-mumbai":
    "https://polygon-amoy.infura.io/v3/868f76e7ffd742789391c48f37bd1e3b",
  "polygon-amoy":
    "https://polygon-amoy.infura.io/v3/868f76e7ffd742789391c48f37bd1e3b",
  bsc: "",
  zil: "",
  hardhat: "",
  cronos: "",
  solana: "",
  "solana-devnet": "",
  base: "https://base-mainnet.infura.io/v3/de21d7dc37334e459e15e172ee9d45f2",
  "base-sepolia": "https://base-sepolia.infura.io/v3/de21d7dc37334e459e15e172ee9d45f2",
  avalanche: "https://avalanche-mainnet.infura.io/v3/de21d7dc37334e459e15e172ee9d45f2",
  "avalanche-fuji": "https://avalanche-fuji.infura.io/v3/de21d7dc37334e459e15e172ee9d45f2",
};
