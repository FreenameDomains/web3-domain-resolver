import {FreenameContractConfig} from "../types/freename-resolver-provider.types";
import {FreenameNetwork} from "../enumerations/enumerations";
import {FNS_ABI} from "./freename-abi.constants";

export const FREENAME_CONTRACT_CONFS: FreenameContractConfig[] = [

    // MAINNET
    // ABSTRACT
    {
        address: "0x4EB671437e98314670787DA0B5e1b3469a456738",
        networkName: FreenameNetwork.ABSTRACT,
        test: false,
        type: "read",
        abi: FNS_ABI,
    },
    {
        address: "0x4EB671437e98314670787DA0B5e1b3469a456738",
        networkName: FreenameNetwork.ABSTRACT,
        test: false,
        type: "write",
        abi: FNS_ABI,
    },

    // AURORA
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

    // AVALANCHE
    {
        address: "0x465ea4967479A96D4490d575b5a6cC2B4A4BEE65",
        networkName: FreenameNetwork.AVALANCHE,
        test: false,
        type: "read",
        abi: FNS_ABI,
    },
    {
        address: "0x465ea4967479A96D4490d575b5a6cC2B4A4BEE65",
        networkName: FreenameNetwork.AVALANCHE,
        test: false,
        type: "write",
        abi: FNS_ABI,
    },

    // BASE
    {
        address: "0x465ea4967479A96D4490d575b5a6cC2B4A4BEE65",
        networkName: FreenameNetwork.BASE,
        test: false,
        type: "read",
        abi: FNS_ABI,
    },
    {
        address: "0x465ea4967479A96D4490d575b5a6cC2B4A4BEE65",
        networkName: FreenameNetwork.BASE,
        test: false,
        type: "write",
        abi: FNS_ABI,
    },

    // BSC
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

    // CHILIZ
    {
        address: "0x465ea4967479A96D4490d575b5a6cC2B4A4BEE65",
        networkName: FreenameNetwork.CHILIZ,
        test: false,
        type: "read",
        abi: FNS_ABI,
    },
    {
        address: "0x465ea4967479A96D4490d575b5a6cC2B4A4BEE65",
        networkName: FreenameNetwork.CHILIZ,
        test: false,
        type: "write",
        abi: FNS_ABI,
    },

    // CRONOS
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

    // ETHERLINK
    {
        address: "0x465ea4967479A96D4490d575b5a6cC2B4A4BEE65",
        networkName: FreenameNetwork.ETHERLINK,
        test: false,
        type: "read",
        abi: FNS_ABI,
    },
    {
        address: "0x465ea4967479A96D4490d575b5a6cC2B4A4BEE65",
        networkName: FreenameNetwork.ETHERLINK,
        test: false,
        type: "write",
        abi: FNS_ABI,
    },

    // POLYGON
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

    // SEI
    {
        address: "0x465ea4967479A96D4490d575b5a6cC2B4A4BEE65",
        networkName: FreenameNetwork.SEI,
        test: false,
        type: "read",
        abi: FNS_ABI,
    },
    {
        address: "0x465ea4967479A96D4490d575b5a6cC2B4A4BEE65",
        networkName: FreenameNetwork.SEI,
        test: false,
        type: "write",
        abi: FNS_ABI,
    },

    // SOLANA
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


    // TESTNET
    // ABSTRACT SEPOLIA TESTNET
    {
        address: "0x9108a3F6629D247e410BaE0cb09636BA5Efa4631",
        networkName: FreenameNetwork.ABSTRACT_SEPOLIA_TESTNET,
        test: false,
        type: "read",
        abi: FNS_ABI,
    },
    {
        address: "0x9108a3F6629D247e410BaE0cb09636BA5Efa4631",
        networkName: FreenameNetwork.ABSTRACT_SEPOLIA_TESTNET,
        test: false,
        type: "write",
        abi: FNS_ABI,
    },

    // AVALANCHE FUJI
    {
        address: "0x490Bfb43b44Ae54e36818Ed295B0814B2dEef2cC",
        networkName: FreenameNetwork.AVALANCHE_FUJI,
        test: true,
        type: "read",
        abi: FNS_ABI,
    },
    {
        address: "0x490Bfb43b44Ae54e36818Ed295B0814B2dEef2cC",
        networkName: FreenameNetwork.AVALANCHE_FUJI,
        test: true,
        type: "write",
        abi: FNS_ABI,
    },

    // BASE SEPOLIA
    {
        address: "0x490Bfb43b44Ae54e36818Ed295B0814B2dEef2cC",
        networkName: FreenameNetwork.BASE_SEPOLIA,
        test: true,
        type: "read",
        abi: FNS_ABI,
    },
    {
        address: "0x490Bfb43b44Ae54e36818Ed295B0814B2dEef2cC",
        networkName: FreenameNetwork.BASE_SEPOLIA,
        test: true,
        type: "write",
        abi: FNS_ABI,
    },

    // CHILIZ TESTNET
    {
        address: "0x12D5dFDf88fEa9397Fcb3d24bCbE1781d282298A",
        networkName: FreenameNetwork.CHILIZ_TESTNET,
        test: true,
        type: "read",
        abi: FNS_ABI,
    },
    {
        address: "0x12D5dFDf88fEa9397Fcb3d24bCbE1781d282298A",
        networkName: FreenameNetwork.CHILIZ_TESTNET,
        test: true,
        type: "write",
        abi: FNS_ABI,
    },

    // ETHERLINK TESTNET
    {
        address: "0xB8257763c36c48a301A763277F6064D729fE4623",
        networkName: FreenameNetwork.ETHERLINK_TESTNET,
        test: true,
        type: "read",
        abi: FNS_ABI,
    },
    {
        address: "0xB8257763c36c48a301A763277F6064D729fE4623",
        networkName: FreenameNetwork.ETHERLINK_TESTNET,
        test: true,
        type: "write",
        abi: FNS_ABI,
    },

    // POLYGON AMOY
    {
        address: "0x490Bfb43b44Ae54e36818Ed295B0814B2dEef2cC",
        networkName: FreenameNetwork.POLYGON_AMOY,
        test: true,
        type: "read",
        abi: FNS_ABI,
    },
    {
        address: "0x490Bfb43b44Ae54e36818Ed295B0814B2dEef2cC",
        networkName: FreenameNetwork.POLYGON_AMOY,
        test: true,
        type: "write",
        abi: FNS_ABI,
    },

    // POLYGON MUMBAI
    {
        // resolves to amoy (mumbai deprecated)
        address: "0x490Bfb43b44Ae54e36818Ed295B0814B2dEef2cC",
        networkName: FreenameNetwork.POLYGON_MUMBAI,
        test: true,
        type: "read",
        abi: FNS_ABI,
    },
    {
        // resolves to amoy (mumbai deprecated)
        address: "0x490Bfb43b44Ae54e36818Ed295B0814B2dEef2cC",
        networkName: FreenameNetwork.POLYGON_MUMBAI,
        test: true,
        type: "write",
        abi: FNS_ABI,
    },

    // SEI TESTNET
    {
        address: "0x490Bfb43b44Ae54e36818Ed295B0814B2dEef2cC",
        networkName: FreenameNetwork.SEI_TESTNET,
        test: true,
        type: "read",
        abi: FNS_ABI,
    },
    {
        address: "0x490Bfb43b44Ae54e36818Ed295B0814B2dEef2cC",
        networkName: FreenameNetwork.SEI_TESTNET,
        test: true,
        type: "write",
        abi: FNS_ABI,
    },

    // SOLANA DEVNET
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
