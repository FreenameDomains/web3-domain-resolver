export const DEFAULT_RPC_URL: Record<string, string> = {

    // MAINNET
    abstract: "https://api.mainnet.abs.xyz",
    aurora: "https://mainnet.aurora.dev",
    avalanche: "https://avalanche-c-chain-rpc.publicnode.com",
    base: "https://base.llamarpc.com",
    bsc: "https://bsc-dataseed1.ninicoin.io",
    chiliz: "https://rpc.chiliz.com",
    cronos: "https://node.croswap.com/rpc",
    ethereum: "https://eth-mainnet.public.blastapi.io",
    etherlink: "https://node.mainnet.etherlink.com",
    sei: "https://evm-rpc.sei-apis.com",
    polygon: "https://rpc-mainnet.matic.quiknode.pro",

    // TESTNET
    "abstract-sepolia-testnet": "https://api.testnet.abs.xyz",
    "avalanche-fuji": "https://avalanche-fuji-c-chain-rpc.publicnode.com",
    "base-sepolia": "https://base-sepolia-rpc.publicnode.com",
    "chiliz-testnet": "https://spicy-rpc.chiliz.com",
    "etherlink-testnet": "https://node.ghostnet.etherlink.com",
    "polygon-amoy": "https://rpc-amoy.polygon.technology",
    "polygon-mumbai": "https://rpc-amoy.polygon.technology",
    "sei-testnet": "https://evm-rpc-testnet.sei-apis.com/",


    hardhat: "http://127.0.0.1:8545/",
    zil: "",
    solana: "",
    "solana-devnet": "",
};

//these urls can only connect to Freename smart contract addresses
export const DEFAULT_INFURA_RPC_URL: Record<string, string> = {

    // MAINNET
    abstract: "https://api.mainnet.abs.xyz",
    aurora: "https://aurora-mainnet.infura.io/v3/de21d7dc37334e459e15e172ee9d45f2",
    avalanche: "https://avalanche-mainnet.infura.io/v3/de21d7dc37334e459e15e172ee9d45f2",
    base: "https://base-mainnet.infura.io/v3/de21d7dc37334e459e15e172ee9d45f2",
    chiliz: "https://rpc.chiliz.com",
    ethereum: "https://mainnet.infura.io/v3/de21d7dc37334e459e15e172ee9d45f2",
    etherlink: "https://node.mainnet.etherlink.com",
    polygon: "https://polygon-mainnet.infura.io/v3/de21d7dc37334e459e15e172ee9d45f2",
    sei: "https://holy-lively-arrow.sei-pacific.quiknode.pro/34b5ebd726c71782cf46ee698fb2e0fb8344a56c/",

    // TESTNET
    "abstract-sepolia-testnet": "https://api.testnet.abs.xyz",
    "avalanche-fuji": "https://avalanche-fuji.infura.io/v3/de21d7dc37334e459e15e172ee9d45f2",
    "base-sepolia": "https://base-sepolia.infura.io/v3/de21d7dc37334e459e15e172ee9d45f2",
    "chiliz-testnet": "https://spicy-rpc.chiliz.com",
    "etherlink-testnet": "https://node.ghostnet.etherlink.com",
    "polygon-mumbai": "https://polygon-amoy.infura.io/v3/868f76e7ffd742789391c48f37bd1e3b",
    "polygon-amoy": "https://polygon-amoy.infura.io/v3/868f76e7ffd742789391c48f37bd1e3b",
    "sei-testnet": "https://morning-evocative-cloud.sei-atlantic.quiknode.pro/4eb5a4fcd996b1fea968fd9870b811a82ae74413/",


    bsc: "",
    zil: "",
    hardhat: "",
    cronos: "",
    solana: "",
    "solana-devnet": "",
};
