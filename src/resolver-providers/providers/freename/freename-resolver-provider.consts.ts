import { NetworkName } from "../../../networks/connections/network-connection.types";
import { FreenameContractConfig } from "./freename-resolver-provider.types";

export const FNS_ABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "previousAdmin",
				"type": "address",
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "newAdmin",
				"type": "address",
			},
		],
		"name": "AdminChanged",
		"type": "event",
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address",
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address",
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
		],
		"name": "Approval",
		"type": "event",
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address",
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address",
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool",
			},
		],
		"name": "ApprovalForAll",
		"type": "event",
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "version",
				"type": "uint8",
			},
		],
		"name": "Initialized",
		"type": "event",
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
			{
				"indexed": true,
				"internalType": "string",
				"name": "keyIndex",
				"type": "string",
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "key",
				"type": "string",
			},
		],
		"name": "NewKey",
		"type": "event",
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "uri",
				"type": "string",
			},
		],
		"name": "NewURI",
		"type": "event",
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "prefix",
				"type": "string",
			},
		],
		"name": "NewURIPrefix",
		"type": "event",
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "addr",
				"type": "address",
			},
		],
		"name": "RemoveReverse",
		"type": "event",
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
		],
		"name": "ResetRecords",
		"type": "event",
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
			{
				"indexed": true,
				"internalType": "string",
				"name": "keyIndex",
				"type": "string",
			},
			{
				"indexed": true,
				"internalType": "string",
				"name": "valueIndex",
				"type": "string",
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "key",
				"type": "string",
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "value",
				"type": "string",
			},
		],
		"name": "SetRecord",
		"type": "event",
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "addr",
				"type": "address",
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
		],
		"name": "SetReverse",
		"type": "event",
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address",
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address",
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
		],
		"name": "Transfer",
		"type": "event",
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "implementation",
				"type": "address",
			},
		],
		"name": "Upgraded",
		"type": "event",
	},
	{
		"inputs": [],
		"name": "NAME",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string",
			},
		],
		"stateMutability": "view",
		"type": "function",
	},
	{
		"inputs": [],
		"name": "VERSION",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string",
			},
		],
		"stateMutability": "view",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "key",
				"type": "string",
			},
		],
		"name": "addKey",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "key",
				"type": "string",
			},
		],
		"name": "addPrivateKey",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address",
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address",
			},
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256",
			},
		],
		"stateMutability": "view",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
			{
				"internalType": "string",
				"name": "label",
				"type": "string",
			},
		],
		"name": "childIdOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256",
			},
		],
		"stateMutability": "pure",
		"type": "function",
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "from",
						"type": "address",
					},
					{
						"internalType": "uint256",
						"name": "nonce",
						"type": "uint256",
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256",
					},
					{
						"internalType": "bytes",
						"name": "data",
						"type": "bytes",
					},
				],
				"internalType": "struct IForwarder.ForwardRequest",
				"name": "req",
				"type": "tuple",
			},
			{
				"internalType": "bytes",
				"name": "signature",
				"type": "bytes",
			},
		],
		"name": "execute",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes",
			},
		],
		"stateMutability": "nonpayable",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
		],
		"name": "exists",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool",
			},
		],
		"stateMutability": "view",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
		],
		"name": "getAllKeys",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "keys",
				"type": "string[]",
			},
		],
		"stateMutability": "view",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address",
			},
		],
		"stateMutability": "view",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "keyHash",
				"type": "uint256",
			},
		],
		"name": "getKey",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string",
			},
		],
		"stateMutability": "view",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "hashes",
				"type": "uint256[]",
			},
		],
		"name": "getKeys",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "values",
				"type": "string[]",
			},
		],
		"stateMutability": "view",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "string[]",
				"name": "keys",
				"type": "string[]",
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
		],
		"name": "getManyRecords",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "values",
				"type": "string[]",
			},
		],
		"stateMutability": "view",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "keyHashes",
				"type": "uint256[]",
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
		],
		"name": "getManyRecordsByHash",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "keys",
				"type": "string[]",
			},
			{
				"internalType": "string[]",
				"name": "values",
				"type": "string[]",
			},
		],
		"stateMutability": "view",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "key",
				"type": "string",
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
		],
		"name": "getRecord",
		"outputs": [
			{
				"internalType": "string",
				"name": "value",
				"type": "string",
			},
		],
		"stateMutability": "view",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "keyHash",
				"type": "uint256",
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
		],
		"name": "getRecordByHash",
		"outputs": [
			{
				"internalType": "string",
				"name": "key",
				"type": "string",
			},
			{
				"internalType": "string",
				"name": "value",
				"type": "string",
			},
		],
		"stateMutability": "view",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "mintingManager",
				"type": "address",
			},
			{
				"internalType": "address",
				"name": "keysManager",
				"type": "address",
			},
		],
		"name": "initialize",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address",
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address",
			},
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool",
			},
		],
		"stateMutability": "view",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address",
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
		],
		"name": "isApprovedOrOwner",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool",
			},
		],
		"stateMutability": "view",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "forwarder",
				"type": "address",
			},
		],
		"name": "isTrustedForwarder",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool",
			},
		],
		"stateMutability": "view",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address",
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address",
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes",
			},
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address",
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
			{
				"internalType": "string",
				"name": "uri",
				"type": "string",
			},
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address",
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
			{
				"internalType": "string",
				"name": "uri",
				"type": "string",
			},
			{
				"internalType": "string[]",
				"name": "keys",
				"type": "string[]",
			},
			{
				"internalType": "string[]",
				"name": "values",
				"type": "string[]",
			},
		],
		"name": "mintWithRecords",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function",
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string",
			},
		],
		"stateMutability": "view",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
		],
		"name": "nonceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256",
			},
		],
		"stateMutability": "view",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address",
			},
			{
				"internalType": "address",
				"name": "from",
				"type": "address",
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes",
			},
		],
		"name": "onERC721Received",
		"outputs": [
			{
				"internalType": "bytes4",
				"name": "",
				"type": "bytes4",
			},
		],
		"stateMutability": "pure",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address",
			},
		],
		"stateMutability": "view",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "string[]",
				"name": "keys",
				"type": "string[]",
			},
			{
				"internalType": "string[]",
				"name": "values",
				"type": "string[]",
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
		],
		"name": "reconfigure",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function",
	},
	{
		"inputs": [],
		"name": "removeReverse",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
		],
		"name": "reset",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
		],
		"name": "resolverOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address",
			},
		],
		"stateMutability": "view",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address",
			},
		],
		"name": "reverseOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256",
			},
		],
		"stateMutability": "view",
		"type": "function",
	},
	{
		"inputs": [],
		"name": "root",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256",
			},
		],
		"stateMutability": "pure",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address",
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
			{
				"internalType": "string",
				"name": "uri",
				"type": "string",
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes",
			},
		],
		"name": "safeMint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address",
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
			{
				"internalType": "string",
				"name": "uri",
				"type": "string",
			},
		],
		"name": "safeMint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address",
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
			{
				"internalType": "string",
				"name": "uri",
				"type": "string",
			},
			{
				"internalType": "string[]",
				"name": "keys",
				"type": "string[]",
			},
			{
				"internalType": "string[]",
				"name": "values",
				"type": "string[]",
			},
		],
		"name": "safeMintWithRecords",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address",
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
			{
				"internalType": "string",
				"name": "uri",
				"type": "string",
			},
			{
				"internalType": "string[]",
				"name": "keys",
				"type": "string[]",
			},
			{
				"internalType": "string[]",
				"name": "values",
				"type": "string[]",
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes",
			},
		],
		"name": "safeMintWithRecords",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address",
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address",
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address",
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address",
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes",
			},
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address",
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool",
			},
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "string[]",
				"name": "keys",
				"type": "string[]",
			},
			{
				"internalType": "string[]",
				"name": "values",
				"type": "string[]",
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
		],
		"name": "setManyRecords",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "keyHashes",
				"type": "uint256[]",
			},
			{
				"internalType": "string[]",
				"name": "values",
				"type": "string[]",
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
		],
		"name": "setManyRecordsByHash",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address",
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
		],
		"name": "setOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "key",
				"type": "string",
			},
			{
				"internalType": "string",
				"name": "value",
				"type": "string",
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
		],
		"name": "setRecord",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "keyHash",
				"type": "uint256",
			},
			{
				"internalType": "string",
				"name": "value",
				"type": "string",
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
		],
		"name": "setRecordByHash",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
		],
		"name": "setReverse",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "prefix",
				"type": "string",
			},
		],
		"name": "setTokenURIPrefix",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
		],
		"name": "size",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256",
			},
		],
		"stateMutability": "view",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4",
			},
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool",
			},
		],
		"stateMutability": "view",
		"type": "function",
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string",
			},
		],
		"stateMutability": "view",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256",
			},
		],
		"name": "tokenByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256",
			},
		],
		"stateMutability": "view",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address",
			},
			{
				"internalType": "uint256",
				"name": "index",
				"type": "uint256",
			},
		],
		"name": "tokenOfOwnerByIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256",
			},
		],
		"stateMutability": "view",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string",
			},
		],
		"stateMutability": "view",
		"type": "function",
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256",
			},
		],
		"stateMutability": "view",
		"type": "function",
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address",
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address",
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256",
			},
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function",
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "from",
						"type": "address",
					},
					{
						"internalType": "uint256",
						"name": "nonce",
						"type": "uint256",
					},
					{
						"internalType": "uint256",
						"name": "tokenId",
						"type": "uint256",
					},
					{
						"internalType": "bytes",
						"name": "data",
						"type": "bytes",
					},
				],
				"internalType": "struct IForwarder.ForwardRequest",
				"name": "req",
				"type": "tuple",
			},
			{
				"internalType": "bytes",
				"name": "signature",
				"type": "bytes",
			},
		],
		"name": "verify",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool",
			},
		],
		"stateMutability": "view",
		"type": "function",
	},
];


export const FREENAME_CONTRACT_CONFS: FreenameContractConfig[] = [
	{
		address: "0x6034C0d80e6d023FFd62Ba48e6B5c13afe72D143",
		networkName: NetworkName.POLYGON_MUMBAI,
		test: true,
		type: "read",
		abi: FNS_ABI,
	},
	{
		address: "0x6034C0d80e6d023FFd62Ba48e6B5c13afe72D143",
		networkName: NetworkName.POLYGON_MUMBAI,
		test: true,
		type: "write",
		abi: FNS_ABI,
	},
	{
		address: "0x465ea4967479A96D4490d575b5a6cC2B4A4BEE65",
		networkName: NetworkName.POLYGON,
		test: false,
		type: "read",
		abi: FNS_ABI,
	},
	{
		address: "0x465ea4967479A96D4490d575b5a6cC2B4A4BEE65",
		networkName: NetworkName.POLYGON,
		test: false,
		type: "write",
		abi: FNS_ABI,
	},
	{
		address: "0x465ea4967479A96D4490d575b5a6cC2B4A4BEE65",
		networkName: NetworkName.CRONOS,
		test: false,
		type: "read",
		abi: FNS_ABI,
	},
	{
		address: "0x465ea4967479A96D4490d575b5a6cC2B4A4BEE65",
		networkName: NetworkName.CRONOS,
		test: false,
		type: "write",
		abi: FNS_ABI,
	},
	{
		address: "0x465ea4967479A96D4490d575b5a6cC2B4A4BEE65",
		networkName: NetworkName.BSC,
		test: false,
		type: "read",
		abi: FNS_ABI,
	},
	{
		address: "0x465ea4967479A96D4490d575b5a6cC2B4A4BEE65",
		networkName: NetworkName.BSC,
		test: false,
		type: "write",
		abi: FNS_ABI,
	},
	{
		address: "0x465ea4967479A96D4490d575b5a6cC2B4A4BEE65",
		networkName: NetworkName.AURORA,
		test: false,
		type: "read",
		abi: FNS_ABI,
	},
	{
		address: "0x465ea4967479A96D4490d575b5a6cC2B4A4BEE65",
		networkName: NetworkName.AURORA,
		test: false,
		type: "write",
		abi: FNS_ABI,
	},
	// {
	// 	address: "",
	// 	networkName: NetworkName.SOLANA,
	// 	test: false,
	// 	type: "read",
	// },
	// {
	// 	address: "",
	// 	networkName: NetworkName.SOLANA,
	// 	test: false,
	// 	type: "write",
	// },
	{
		address: "6cMUj75fcW7kaCJbFcSuAGjES22RMfnxg8QX8FJEprPL",
		networkName: NetworkName.SOLANA_DEVNET,
		test: true,
		type: "read",
	},
	{
		address: "6cMUj75fcW7kaCJbFcSuAGjES22RMfnxg8QX8FJEprPL",
		networkName: NetworkName.SOLANA_DEVNET,
		test: true,
		type: "write",
	},
];
