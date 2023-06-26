// import { SolanaContractConnection } from "./networks/connections/sol-contract-connection";

export * from "./defaults/web3-resolver";

export * from "./networks/connections/connection-library";
export * from "./networks/connections/contract-connection";
export * from "./networks/connections/network-connection.types";

export * from "./resolver-providers/resolver-provider.interface";
export * from "./resolver-providers/providers/ens/ens-resolver-provider";
export * from "./resolver-providers/providers/freename/freename-resolver-provider";
export * from "./resolver-providers/providers/ud/ud-resolver-provider";
export * from "./resolver-providers/providers/base-resolver-provider";

export * from "./resolvers/resolver";
export * from "./resolvers/resolved-resource/resolved-resource.interface";
export * from "./resolvers/resolved-resource/resolved-resource";
export * from "./resolvers/types/resolved-resource-type";
export * from "./resolvers/types/resolver-name";

export * from "./tools/name-tools";
export * from "./tools/name-tools.types";

// const sol = new SolanaContractConnection({ network: { networkName: "solana", rpcUrl: "null" }, address: "null" });
// sol.findNft();