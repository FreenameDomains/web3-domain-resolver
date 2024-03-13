export const IDL = {
	"version": "0.1.0",
	"name": "freename_ns_solana",
	"constants": [
		{
			"name": "STATE_SEED",
			"type": "string",
			"value": "\"ns_state\""
		},
		{
			"name": "AUTHORITY_SEED",
			"type": "string",
			"value": "\"ns_authority\""
		},
		{
			"name": "RECORD_SEED",
			"type": "string",
			"value": "\"ns_record\""
		},
		{
			"name": "METADATA_SEED",
			"type": "string",
			"value": "\"ns_metadata\""
		},
		{
			"name": "PROPERTY_SEED",
			"type": "string",
			"value": "\"ns_property\""
		},
		{
			"name": "MINT_SEED",
			"type": "string",
			"value": "\"mint\""
		},
		{
			"name": "COLLECTION_SEED",
			"type": "string",
			"value": "\"collection_mint\""
		},
		{
			"name": "DISCRIMINATOR_LENGTH",
			"type": {
				"defined": "usize"
			},
			"value": "8"
		},
		{
			"name": "U8_LENGTH",
			"type": {
				"defined": "usize"
			},
			"value": "1"
		},
		{
			"name": "PUBLIC_KEY_LENGTH",
			"type": {
				"defined": "usize"
			},
			"value": "32"
		},
		{
			"name": "VECTOR_LENGTH",
			"type": {
				"defined": "usize"
			},
			"value": "4"
		},
		{
			"name": "MAX_NS_PROPERTY_LENGTH",
			"type": {
				"defined": "usize"
			},
			"value": "30 * 4"
		},
		{
			"name": "MAX_NS_RECORD_LENGTH",
			"type": {
				"defined": "usize"
			},
			"value": "30 * 4"
		}
	],
	"instructions": [
		{
			"name": "init",
			"docs": [
				"Creates NFT Collection"
			],
			"accounts": [
				{
					"name": "state",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "nsAuthority",
					"isMut": false,
					"isSigner": false
				},
				{
					"name": "mint",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "metadata",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "tokenAccount",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "masterEditionAccount",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "collectionAuthorityRecord",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "payer",
					"isMut": true,
					"isSigner": true
				},
				{
					"name": "tokenProgram",
					"isMut": false,
					"isSigner": false
				},
				{
					"name": "tokenMetadataProgram",
					"isMut": false,
					"isSigner": false
				},
				{
					"name": "associatedTokenProgram",
					"isMut": false,
					"isSigner": false
				},
				{
					"name": "rent",
					"isMut": false,
					"isSigner": false
				},
				{
					"name": "systemProgram",
					"isMut": false,
					"isSigner": false
				}
			],
			"args": [
				{
					"name": "owner",
					"type": "publicKey"
				}
			]
		},
		{
			"name": "pause",
			"accounts": [
				{
					"name": "signer",
					"isMut": true,
					"isSigner": true
				},
				{
					"name": "nsState",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "systemProgram",
					"isMut": false,
					"isSigner": false
				}
			],
			"args": []
		},
		{
			"name": "unpause",
			"accounts": [
				{
					"name": "signer",
					"isMut": true,
					"isSigner": true
				},
				{
					"name": "nsState",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "systemProgram",
					"isMut": false,
					"isSigner": false
				}
			],
			"args": []
		},
		{
			"name": "mintNft",
			"docs": [
				"Mints new NFT for collection with default properties"
			],
			"accounts": [
				{
					"name": "nsState",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "nsAuthority",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "nsRecordMetadata",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "nsRecordData",
					"isMut": true,
					"isSigner": true
				},
				{
					"name": "mint",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "tldMint",
					"isMut": true,
					"isSigner": false,
					"isOptional": true
				},
				{
					"name": "metadata",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "masterEditionAccount",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "collectionMint",
					"isMut": false,
					"isSigner": false
				},
				{
					"name": "collectionMetadata",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "collectionMasterEditionAccount",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "tokenAccount",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "nsPropertyMetadata",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "nsPropertyData",
					"isMut": true,
					"isSigner": true
				},
				{
					"name": "payer",
					"isMut": true,
					"isSigner": true
				},
				{
					"name": "tokenProgram",
					"isMut": false,
					"isSigner": false
				},
				{
					"name": "tokenMetadataProgram",
					"isMut": false,
					"isSigner": false
				},
				{
					"name": "associatedTokenProgram",
					"isMut": false,
					"isSigner": false
				},
				{
					"name": "rent",
					"isMut": false,
					"isSigner": false
				},
				{
					"name": "systemProgram",
					"isMut": false,
					"isSigner": false
				}
			],
			"args": [
				{
					"name": "name",
					"type": "string"
				}
			]
		},
		{
			"name": "mintNftWithRecords",
			"docs": [
				"Mints new NFT for collection with default properties and records"
			],
			"accounts": [
				{
					"name": "nsState",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "nsAuthority",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "nsRecordMetadata",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "nsRecordData",
					"isMut": true,
					"isSigner": true
				},
				{
					"name": "mint",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "tldMint",
					"isMut": true,
					"isSigner": false,
					"isOptional": true
				},
				{
					"name": "metadata",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "masterEditionAccount",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "collectionMint",
					"isMut": false,
					"isSigner": false
				},
				{
					"name": "collectionMetadata",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "collectionMasterEditionAccount",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "tokenAccount",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "nsPropertyMetadata",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "nsPropertyData",
					"isMut": true,
					"isSigner": true
				},
				{
					"name": "payer",
					"isMut": true,
					"isSigner": true
				},
				{
					"name": "tokenProgram",
					"isMut": false,
					"isSigner": false
				},
				{
					"name": "tokenMetadataProgram",
					"isMut": false,
					"isSigner": false
				},
				{
					"name": "associatedTokenProgram",
					"isMut": false,
					"isSigner": false
				},
				{
					"name": "rent",
					"isMut": false,
					"isSigner": false
				},
				{
					"name": "systemProgram",
					"isMut": false,
					"isSigner": false
				}
			],
			"args": [
				{
					"name": "name",
					"type": "string"
				},
				{
					"name": "recordSize",
					"type": "u64"
				},
				{
					"name": "recordKeys",
					"type": {
						"vec": "string"
					}
				},
				{
					"name": "recordValues",
					"type": {
						"vec": "string"
					}
				}
			]
		},
		{
			"name": "burnNft",
			"docs": [
				"Burn"
			],
			"accounts": [
				{
					"name": "benefitiary",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "nsState",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "nsAuthority",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "nsRecordMetadata",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "nsRecordData",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "nsPropertyMetadata",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "nsPropertyData",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "mint",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "collectionMint",
					"isMut": false,
					"isSigner": false
				},
				{
					"name": "metadata",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "masterEditionAccount",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "tokenAccount",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "collectionMetadata",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "payer",
					"isMut": false,
					"isSigner": true
				},
				{
					"name": "tokenProgram",
					"isMut": false,
					"isSigner": false
				},
				{
					"name": "tokenMetadataProgram",
					"isMut": false,
					"isSigner": false
				},
				{
					"name": "associatedTokenProgram",
					"isMut": false,
					"isSigner": false
				},
				{
					"name": "rent",
					"isMut": false,
					"isSigner": false
				},
				{
					"name": "systemProgram",
					"isMut": false,
					"isSigner": false
				}
			],
			"args": [
				{
					"name": "name",
					"type": "string"
				}
			]
		},
		{
			"name": "updateRecords",
			"docs": [
				"Updates Records"
			],
			"accounts": [
				{
					"name": "nsState",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "nsRecordMetadata",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "nsRecordData",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "payer",
					"isMut": true,
					"isSigner": true
				},
				{
					"name": "systemProgram",
					"isMut": false,
					"isSigner": false
				},
				{
					"name": "rent",
					"isMut": false,
					"isSigner": false
				}
			],
			"args": [
				{
					"name": "name",
					"type": "string"
				},
				{
					"name": "upsertKeys",
					"type": {
						"vec": "string"
					}
				},
				{
					"name": "upsertValues",
					"type": {
						"vec": "string"
					}
				},
				{
					"name": "deleteKeys",
					"type": {
						"vec": "string"
					}
				},
				{
					"name": "recordSize",
					"type": "u64"
				}
			]
		},
		{
			"name": "transferNft",
			"docs": [
				"Transfers NFT and resets records"
			],
			"accounts": [
				{
					"name": "nsState",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "payer",
					"isMut": true,
					"isSigner": true
				},
				{
					"name": "sender",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "recipient",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "mint",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "nsRecordMetadata",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "nsRecordData",
					"isMut": true,
					"isSigner": false
				},
				{
					"name": "systemProgram",
					"isMut": false,
					"isSigner": false
				},
				{
					"name": "tokenProgram",
					"isMut": false,
					"isSigner": false
				}
			],
			"args": [
				{
					"name": "name",
					"type": "string"
				}
			]
		}
	],
	"accounts": [
		{
			"name": "NsPropertyMetadata",
			"type": {
				"kind": "struct",
				"fields": [
					{
						"name": "account",
						"type": "publicKey"
					}
				]
			}
		},
		{
			"name": "NsProperties",
			"type": {
				"kind": "struct",
				"fields": [
					{
						"name": "properties",
						"type": {
							"vec": {
								"defined": "NsProperty"
							}
						}
					}
				]
			}
		},
		{
			"name": "NsRecordMetadata",
			"type": {
				"kind": "struct",
				"fields": [
					{
						"name": "account",
						"type": "publicKey"
					}
				]
			}
		},
		{
			"name": "NsRecords",
			"type": {
				"kind": "struct",
				"fields": [
					{
						"name": "records",
						"type": {
							"vec": {
								"defined": "NsRecord"
							}
						}
					}
				]
			}
		},
		{
			"name": "NsState",
			"type": {
				"kind": "struct",
				"fields": [
					{
						"name": "init",
						"type": "u8"
					},
					{
						"name": "paused",
						"type": "u8"
					},
					{
						"name": "owner",
						"type": "publicKey"
					}
				]
			}
		}
	],
	"types": [
		{
			"name": "NsProperty",
			"type": {
				"kind": "struct",
				"fields": [
					{
						"name": "key",
						"type": "string"
					},
					{
						"name": "value",
						"type": "string"
					}
				]
			}
		},
		{
			"name": "NsRecord",
			"type": {
				"kind": "struct",
				"fields": [
					{
						"name": "key",
						"type": "string"
					},
					{
						"name": "value",
						"type": "string"
					}
				]
			}
		}
	],
	"errors": [
		{
			"code": 6000,
			"name": "AlreadyInitialized",
			"msg": "Program already initialized"
		},
		{
			"code": 6001,
			"name": "AlreadyPaused",
			"msg": "Program already paused"
		},
		{
			"code": 6002,
			"name": "AlreadyUnpaused",
			"msg": "Program already unpaused"
		},
		{
			"code": 6003,
			"name": "Paused",
			"msg": "Program paused"
		},
		{
			"code": 6004,
			"name": "Unauthorized",
			"msg": "Only owner can invoke this function"
		},
		{
			"code": 6005,
			"name": "IncorrectOwner",
			"msg": "Account does not have correct owner"
		},
		{
			"code": 6006,
			"name": "Uninitialized",
			"msg": "Account is not initialized"
		},
		{
			"code": 6007,
			"name": "ValidationError",
			"msg": "Validation error"
		},
		{
			"code": 6008,
			"name": "GeneralError",
			"msg": "General error"
		}
	],
	"metadata": {
		"address": "FPvXvNtFUgnbJM6d8FTGKzKLeWQADYosLgcEuRDcRwX2"
	}
};


/**
	*  item: {
				id: new ObjectId("6492ee4e41b5e659bfda5f71"),
				name: 'freenametest1',
				tldAsciiName: 'freenametest1',
				type: 'TLD',
				blockchainMetadata: {
						dnsRecords: [ [length]: 0 ],
						addresses: [ [length]: 0 ],
						redirects: [ [length]: 0 ]
				}
		},
		user: {
				id: new ObjectId("6492ee4e41b5e659bfda5f72"),
				walletAddress: 'J4btwDpVLMZvRQSggx1cfkACHjY8wZEwV2LuNtbhXVR5'
		},
		mint: { id: null },
		request: { requestedBlockchain: 'solana' },
		result: true,
		blockchainData: {
				blockchain: 'solana',
				tokenId: 'CcQTkZqezYGLgSLEC8E9XxaRtoxfeSLhpvasdMyGjGar',
				mintDate: 2023-06-21T12:34:39.795Z,
				mintingSmartContractAddress: 'FPvXvNtFUgnbJM6d8FTGKzKLeWQADYosLgcEuRDcRwX2',
				registrySmartContractAddress: 'HjzgJ4BHQhXfqdp3S64p4x6sa5HqH4SY8wSMGdRZX8P9',
				transaction: { hash: undefined },
				minterAddress: undefined,
				ownerAddress: 'J4btwDpVLMZvRQSggx1cfkACHjY8wZEwV2LuNtbhXVR5'
		}
}
	*/