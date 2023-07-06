import { Sft, SftWithToken, Nft, NftWithToken } from "@metaplex-foundation/js";
import { PublicKey } from "@solana/web3.js";
import { ethers } from "ethers";

export type _transaction = ethers.providers.TransactionResponse;

export type _receipt = ethers.providers.TransactionReceipt;

export type _publicKey = PublicKey | null;

export type _nft = Sft | SftWithToken | Nft | NftWithToken | undefined;

export type _string = string | undefined;