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
	POLYGON = "polygon",
	POLYGON_MUMBAI = "polygon-mumbai",
	ETHEREUM = "ethereum",
	BSC = "bsc",
	ZILLIQA = "zil",
	HARDHAT = "hardhat",
	AURORA = "aurora",
	CRONOS = "cronos",
	BASE = "base",
	BASE_SEPOLIA = "base-sepolia",
	AVALANCHE = "avalanche",
	AVALANCHE_FUJI = "avalanche-fuji",
	SEI = "sei",
	SEI_TESTNET = "sei-testnet",
	ETHERLINK = "etherlink",
	ETHERLINK_TESTNET = "etherlink-testnet",
	CHILIZ = "chiliz",
	CHILIZ_TESTNET = "chiliz-testnet",
	SOLANA_DEVNET = "solana-devnet",
	SOLANA = "solana",
}

/**
 * Networks supported by Freename.
 */
export declare const enum FreenameNetwork {
	POLYGON = "polygon",
	POLYGON_MUMBAI = "polygon-mumbai",
	POLYGON_AMOY = "polygon-amoy",
	ETHEREUM = "ethereum",
	BSC = "bsc",
	CRONOS = "cronos",
	SOLANA = "solana",
	SOLANA_DEVNET = "solana-devnet",
	AURORA = "aurora",
	BASE = "base",
	BASE_SEPOLIA = "base-sepolia",
	SEI = "sei",
	SEI_TESTNET = "sei-testnet",
	ETHERLINK = "etherlink",
	ETHERLINK_TESTNET = "etherlink-testnet",
    CHILIZ = "chiliz",
    CHILIZ_TESTNET = "chiliz-testnet",
	AVALANCHE = "avalanche",
	AVALANCHE_FUJI = "avalanche-fuji",
}

/**
 * Networks supported by Unstoppable Domains.
 */
export declare const enum UdNetwork {
	POLYGON = "polygon",
	ETHEREUM = "ethereum",
	ZILLIQA = "zil",
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
