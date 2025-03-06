export enum NetworkName {
	ABSTRACT = "abstract",
	AURORA = "aurora",
	BASE = "base",
	BSC = "bsc",
	CHILIZ = "chiliz",
	CRONOS = "cronos",
	ETHEREUM = "ethereum",
	ETHERLINK = "etherlink",
	POLYGON = "polygon",
	SEI = "sei",
	ZILLIQA = "zilliqa"
}

export type NetworkConnection = {
	networkName: NetworkName | string,
	rpcUrl: string
}