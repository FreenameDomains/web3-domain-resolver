/**
 * @file This file contains all enumerations used in the project.
 */

/**
 * The name of the provider. Eg. 'Freename'
 */
export declare const enum ProviderName {
    FREENAME = "freename",
    UD = "unstoppable",
    ENS = "ens",
}

/********************* NETWORKS *********************/

/**
 * All supported networks.
 */
export declare const enum NetworkName {

    // MAINNET
    ABSTRACT = "abstract",
    AURORA = "aurora",
    AVALANCHE = "avalanche",
    BASE = "base",
    BSC = "bsc",
    CHILIZ = "chiliz",
    CRONOS = "cronos",
    ETHEREUM = "ethereum",
    ETHERLINK = "etherlink",
    HARDHAT = "hardhat",
    POLYGON = "polygon",
    SEI = "sei",
    SOLANA = "solana",
    ZILLIQA = "zil",

    // TESTNET
    ABSTRACT_SEPOLIA = "abstract-sepolia-testnet",
    AVALANCHE_FUJI = "avalanche-fuji",
    BASE_SEPOLIA = "base-sepolia",
    CHILIZ_TESTNET = "chiliz-testnet",
    ETHERLINK_TESTNET = "etherlink-testnet",
    POLYGON_MUMBAI = "polygon-mumbai",
    SEI_TESTNET = "sei-testnet",
    SOLANA_DEVNET = "solana-devnet",
}

/**
 * Networks supported by Freename.
 */
export declare const enum FreenameNetwork {

    // MAINNET
    ABSTRACT = "abstract",
    AURORA = "aurora",
    AVALANCHE = "avalanche",
    BASE = "base",
    BSC = "bsc",
    CHILIZ = "chiliz",
    CRONOS = "cronos",
    ETHEREUM = "ethereum",
    ETHERLINK = "etherlink",
    POLYGON = "polygon",
    SEI = "sei",
    SOLANA = "solana",

    // TESTNET
    ABSTRACT_SEPOLIA_TESTNET = "abstract-sepolia-testnet",
    AVALANCHE_FUJI = "avalanche-fuji",
    BASE_SEPOLIA = "base-sepolia",
    CHILIZ_TESTNET = "chiliz-testnet",
    ETHERLINK_TESTNET = "etherlink-testnet",
    POLYGON_AMOY = "polygon-amoy",
    POLYGON_MUMBAI = "polygon-mumbai",
    SEI_TESTNET = "sei-testnet",
    SOLANA_DEVNET = "solana-devnet",
}

/**
 * Networks supported by Unstoppable Domains.
 */
export declare const enum UdNetwork {
    POLYGON = "polygon",
    ETHEREUM = "ethereum",
    ZILLIQA = "zil",
    BASE = "base",
}

/**
 * Networks supported by ENS.
 */
export declare const enum ENSEthNetwork {
    ETHEREUM = "ethereum",
}

/********************* ITEMS *********************/

/**
 * Item types supported by Freename.
 */
export declare const enum FreenameItemType {
    TLD = "TLD",
    SECOND_LEVEL_DOMAIN = "SECOND_LEVEL_DOMAIN",
    SUB_DOMAINED_DOMAIN = "SUB_DOMAINED_DOMAIN",
}

/**
 * Resolved resource types.
 */
export declare const enum ResolvedResourceType {
    TLD = "tld",
    SECOND_LEVEL_DOMAIN = "domain",
    UNTYPED = "UNTYPED",
}

/**
 * Name types
 */
export declare const enum NameType {
    TLD = "tld",
    SECOND_LEVEL_DOMAIN = "domain",
    SUB_DOMAINED_DOMAIN = "sub-domain",
}
