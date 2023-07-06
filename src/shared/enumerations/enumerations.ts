/**
 * @file This file contains all enumerations used in the project.
 */

/**
 * The name of the provider. Eg. 'Freename'
 */
export declare const enum ProviderName {
  FREENAME = "freename",
  UD = "unstoppable",
  ENS = "ens"
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
  SOLANA_DEVNET = "solana-devnet",
  SOLANA = "solana"
}
/**
 * Networks supported by Freename.
 */
export declare const enum FreenameNetwork {
  POLYGON = "polygon",
  POLYGON_MUMBAI = "polygon-mumbai",
  ETHEREUM = "ethereum",
  BSC = "bsc",
  CRONOS = "cronos",
  SOLANA = "solana",
  SOLANA_DEVNET = "solana-devnet",
  AURORA = "aurora",
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
  UNTYPED = "UNTYPED"
}
/**
 * Name types
 */
export declare const enum NameType {
  TLD = "tld",
  SECOND_LEVEL_DOMAIN = "domain",
  SUB_DOMAINED_DOMAIN = "sub-domain"
}